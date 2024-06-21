using Core.Entities;

namespace Core.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetAsync(int id);
        Task<T> GetAsync(string name);
        Task AddAsync<Entity>(Entity entity) where Entity : class;
    }
}
