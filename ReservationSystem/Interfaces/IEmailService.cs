using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string html);
    }
}
