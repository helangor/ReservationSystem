using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime EndTime { get; set; } = DateTime.Now;
        public Company Company { get; set; }


        public List<DateTime> GetReservedDaysList(List<Reservation> reservations)
        {
            var dates = new List<DateTime>();

            //TODO: Tähän vielä aikavyöhykkeet mukaan

            foreach (var reservation in reservations)
            {
                for (DateTime date = reservation.StartTime; date < reservation.EndTime; date = date.AddDays(1))
                    dates.Add(date);
            }

            return dates.OrderBy(x => x.Date).ToList();
        }
    }
}
