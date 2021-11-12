using ReservationSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
