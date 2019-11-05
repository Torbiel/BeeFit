using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BeeFitDbContext _context;

        public AuthRepository(BeeFitDbContext context)
        {
            _context = context;
        }
        
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if(user == null)
            {
                // The controller will return Unauthorized response when getting null from this method
                return null;
            }
            
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            var computedHash = KeyDerivation.Pbkdf2(password, passwordSalt, KeyDerivationPrf.HMACSHA256, 10000, 256 / 8);

            if(computedHash.SequenceEqual(passwordHash))
            {
                return true;
            }

            return false;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // dividing by 8, because the size of an array is given in elements, so we need 16 elements, 8 bytes each
            passwordSalt = new byte[128 / 8];

            using(var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(passwordSalt);
            }

            // https://crypto.stackexchange.com/questions/53826/hmac-sha256-vs-hmac-sha512-for-jwt-api-authentication
            // https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256
            passwordHash = KeyDerivation.Pbkdf2(password, passwordSalt, KeyDerivationPrf.HMACSHA256, 10000, 256 / 8);
        }

        public async Task<bool> UserExists(string email)
        {
            if(await _context.Users.AnyAsync(x => x.Email == email))
            {
                return true;
            }

            return false;
        }

        public User CreateNewPassword(User user, string oldPassword, string newPassword)
        {
            if(!VerifyPasswordHash(oldPassword, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            byte[] newPasswordHash, newPasswordSalt;

            CreatePasswordHash(newPassword, out newPasswordHash, out newPasswordSalt);

            user.PasswordHash = newPasswordHash;
            user.PasswordSalt = newPasswordSalt;

            return user;
        }
    }
}
