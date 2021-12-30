using ReservationSystemBackend.Data;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public ReservationStatus Status { get; set; } = ReservationStatus.New;
        public string ExtraInfo { get; set; }
        public Product Product { get; set; }

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

        public static ICollection<Reservation> GetReservations(int productId, DataContext context)
        {
            var query = from product in context.Products
                        where (product.Id == productId)
                        select product.Reservations;

            var reservations = query.SingleOrDefault();
            return reservations;
        }

        public enum ReservationStatus
        {
            New,
            Confirmed,
            Rejected,
            Cancelled,
            NotAvailable
        }
    }
}
