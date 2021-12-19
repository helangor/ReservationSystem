using ReservationSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystemBackend.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string City { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
