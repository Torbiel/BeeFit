﻿using BeeFit.API.Models;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
        User CreateNewPassword(User user, string oldPassword, string newPassword);
    }
}
