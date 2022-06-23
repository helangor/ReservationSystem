using ReservationSystem.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReservationSystem.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsername(string username);
    }
}
