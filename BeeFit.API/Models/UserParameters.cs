using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Models
{
    public class UserParameters
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public double Weight { get; set; }
        public double AbdominalCircumference { get; set; }
    }
}
