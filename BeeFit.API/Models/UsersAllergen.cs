﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Models
{
    public class UsersAllergen
    {
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual Allergen Allergen { get; set; }
        public int AllergenId { get; set; }
    }
}
