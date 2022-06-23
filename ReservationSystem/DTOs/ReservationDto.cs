using System;

namespace ReservationSystem.DTOs
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime EndTime { get; set; } = DateTime.Now;
    }
}
