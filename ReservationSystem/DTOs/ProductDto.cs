using ReservationSystem.Entities;
using System;
using System.Collections.Generic;

namespace ReservationSystem.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Introduction { get; set; }
        public string City { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<PriceRow> PriceRows { get; set; }
    }
}
