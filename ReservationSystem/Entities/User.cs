using System;
using System.Collections.Generic;

namespace ReservationSystem.Entities
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public ICollection<Company> Companies { get; set; }

    }
}
