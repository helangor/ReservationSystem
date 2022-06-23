using System;
using System.Collections.Generic;
using System.Threading;

namespace ReservationSystem.Entities
{
    public class PriceRow : BaseEntity
    {
        public string Name { get; set; }
        public List<DayOfWeek> DayOfWeeks { get; set; } = new List<DayOfWeek>();
        public List<DateTime> CertainDays { get; set; } = new List<DateTime>();
        public int AmountOfConsecutiveDays { get; set; }
        public double Price { get; set; }
    }
}