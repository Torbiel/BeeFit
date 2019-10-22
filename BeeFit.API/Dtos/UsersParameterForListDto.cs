using System;

namespace BeeFit.API.Dtos
{
    public class UsersParameterForListDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double? Weight { get; set; }
        public double? AbdominalCircumference { get; set; }
        public double? BicepsCircumference { get; set; }
        public double? ThighCircumference { get; set; }
    }
}
