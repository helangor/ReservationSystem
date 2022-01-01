using Newtonsoft.Json;
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
        public string Name { get; set; }
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

        public List<DateTime> GetReservedDaysList(List<Reservation> reservations, Product product)
        {
            var dates = new List<DateTime>();

            //TODO: Tähän vielä aikavyöhykkeet mukaan

            foreach (var reservation in reservations)
            {
                for (DateTime date = reservation.StartTime; date < reservation.EndTime; date = date.AddDays(1))
                    dates.Add(date);
            }

            var unavailableDaysJson = product.UnavailableDays;
            if (unavailableDaysJson != null)
            {
                List<DateTime> unavailableDays = JsonConvert.DeserializeObject<List<DateTime>>(unavailableDaysJson);
                dates = dates.Concat(unavailableDays).Distinct().ToList();
            }

            //TODO: Kun tallennetaan listaa niin sitten tekee tämän tallennuksessa
            //string output = JsonConvert.SerializeObject(reservationDays);
            //Samalla poistaa vanhemmat päivät kuin tämä
            //product.UnavailableDays = output;

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
