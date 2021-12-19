﻿using ReservationSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystemBackend.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public TimeSpan ReservationStartTime { get; set; } = new TimeSpan(14, 0, 0);
        public TimeSpan ReservationEndTime { get; set; } = new TimeSpan(12, 0, 0);
        public string Introduction { get; set; }
        public string City { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
