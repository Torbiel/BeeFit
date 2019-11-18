using System;

namespace BeeFit.API.Dtos.UsersParameters
{
    public class UsersParameterForAddDto
    {
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public int Id { get; set; }
        public double? Weight { get; set; }
        public double? AbdominalCircumference { get; set; }
        public double? BicepsCircumference { get; set; }
        public double? ThighCircumference { get; set; }
    }
}
