﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeeFit.API.Models
{
    public class UsersParameter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public double? Weight { get; set; }
        public double? AbdominalCircumference { get; set; }
        public double? BicepsCircumference { get; set; }
        public double? ThighCircumference { get; set; }
    }
}
