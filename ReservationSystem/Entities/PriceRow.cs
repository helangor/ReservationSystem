using ReservationSystem.Enums;
using System;

namespace ReservationSystem.Entities
{
    public class PriceRow
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimePeriod TimePeriod { get; set; }
        public DateTime SpecialStartDate { get; set; }
        public DateTime SpecialEndDate { get; set; }
        public double Price { get; set; }
    }
}