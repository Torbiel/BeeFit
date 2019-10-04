using BeeFit.API.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Day Day { get; set; }
    }
}
