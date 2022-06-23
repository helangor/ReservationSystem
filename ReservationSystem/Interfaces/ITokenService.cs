using ReservationSystem.Entities;

namespace ReservationSystem.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
