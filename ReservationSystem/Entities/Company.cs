using ReservationSystemBackend.Data;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Product> Products { get; set; }

        public static Company GetCompanyByProductId(int productId, DataContext context)
        {
            var company = context.Companies.Where(c => c.Products.Any(p => p.Id == productId)).FirstOrDefault();
            return company;
        }
    }
}
