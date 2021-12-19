using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string City { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
