﻿using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IDishesRepository : IBeeFitRepository
    {
        public Task<List<Dish>> GetManyBySearchPreference(string name, List<SearchPreference> searchPreferences); 
    }
}