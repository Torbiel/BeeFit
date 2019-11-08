using System;
using System.ComponentModel.DataAnnotations;

namespace BeeFit.API.Dtos
{
    public class UsersParameterDto
    {
        [Required(ErrorMessage = "You didn't pick a date")]
        public DateTime Date { get; set; }
        public double? Weight { get; set; }
        public double? AbdominalCircumference { get; set; }
        public double? BicepsCircumference { get; set; }
        public double? ThighCircumference { get; set; }
    }
}
