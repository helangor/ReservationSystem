using ReservationSystem.Enums;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Entities
{
    public class PriceRow
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DayOfWeek> DayOfWeeks { get; set; } = new List<DayOfWeek>();
        public List<DateOnly> CertainDays { get; set; } = new List<DateOnly>();
        public int AmountOfConsecutiveDays { get; set; }
        public double Price { get; set; }
    }
}