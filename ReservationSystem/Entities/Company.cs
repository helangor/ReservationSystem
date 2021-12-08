using ReservationSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystemBackend.Entities
{
    public class Company
    {
        public Company()
        {
            this.Users = new HashSet<User>();
        }
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string City { get; set; }
        //public ICollection<Photo> Photos { get; set; }
        public virtual ICollection<User> Users { get; set; }

    }
}
