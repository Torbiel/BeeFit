using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IBeeFitRepository
    {
        Task<T> Get<T>(int id) where T : class;
        void Add<T>(T entity) where T : class;
        void Delete<T>(int id) where T : class;
        void Update<T>(T entity) where T : class;
        Task<IEnumerable<T>> GetAll<T>() where T : class;
        Task<bool> SaveAll();
    }
}
