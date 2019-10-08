using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Models
{
    public class User
    {
        // Required during registration or automatically updated fields.
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
        [Required]
        public DateTime Created { get; set; }
        [Required]
        public DateTime LastActive { get; set; }
        [Required]
        public bool Deleted { get; set; }

        // Not required fields.
        public string Username { get; set; }
        public int? Height { get; set; }
    }
}
