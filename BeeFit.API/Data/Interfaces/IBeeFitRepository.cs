using BeeFit.API.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IBeeFitRepository
    {
        Task<T> GetById<T>(int id) where T : class;
        Task<IEnumerable<T>> GetAll<T>() where T : class;
        void Add<T>(T entity) where T : class;
        Task<bool> Delete<T>(int id) where T : class;
        void Update<T>(T entity) where T : class;
        Task<IEnumerable<T>> Find<T>(Expression<Func<T, bool>> predicate) where T : class;
        Task<bool> SaveAll();
    }
}
