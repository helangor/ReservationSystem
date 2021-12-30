using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Entities;
using ReservationSystem.Interfaces;
using ReservationSystemBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    public class ReservationController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IEmailService emailService;

        public ReservationController(DataContext context, IMapper mapper, IEmailService emailService)
        {
            this.context = context;
            this.mapper = mapper;
            this.emailService = emailService;
        }

        [HttpPost("create-reservation")]
        public async Task<ActionResult> CreateReservation(Reservation reservation)
        {
            reservation.Status = Reservation.ReservationStatus.New;
            //TODO: Tähän vielä varmistus, että email on oikea. 
            var reservationMessage = string.Format(
                "<div>Hei {0}!</div> " +
                "<p>Olemme vastaanottaneet varauksenne ajalle {1} - {2}</p>" +
                "<p>Vuokraavan yrityksen tiedot:</p>" +
                "<p>{3}</p>" +
                "<p>{4}</p>" +
                "<br>" +
                "<p>Mukavaa paljuilua toivottaa, </p>" +
                "<p>Paljumies, www.paljumies.fi</p>",
                reservation.FirstName, TimeZone.CurrentTimeZone.ToLocalTime(reservation.StartTime).ToString(), TimeZone.CurrentTimeZone.ToLocalTime(reservation.EndTime).ToString(), reservation.Product.Name, reservation.Product.City);

            emailService.SendEmail(reservation.Email, "Varaus vahvistus", reservationMessage);

            //Kludge. Ettei valita kuvien ID keystä
            reservation.Product.Photos = null;
            context.Reservations.Add(reservation);
            context.Products.Attach(reservation.Product);
            await context.SaveChangesAsync();
            return Ok();
        }

        //[Authorize]
        [HttpPost("cancel-reservation")]
        public async Task<ActionResult> CancelReservation(Reservation reservation)
        {
            var entity = context.Reservations.Include(p => p.Product).FirstOrDefault(item => item.Id == reservation.Id);
            if (entity != null)
            {
                entity.Status = Reservation.ReservationStatus.Cancelled;
                context.Reservations.Update(entity);
                context.SaveChanges();
            }

            var company = Company.GetCompanyByProductId(entity.Product.Id, context);

            var reservationMessage = string.Format(
                "<div>Hei {0}!</div> " +
                "<p>Vuokranantaja on peruuttanut varauksenne ajalle {1} - {2}</p>" +
                "<p>Jos asiasta heräsi kysyttävää, olkaa yhteydessä vuokraavaan yritykseen </p>" +
                "<p>Vuokraavan yrityksen tiedot:</p>" +
                "<p>{3}</p>" +
                "<br>" +
                "<p>Paljumies, www.paljumies.fi</p>",
                reservation.FirstName, TimeZone.CurrentTimeZone.ToLocalTime(reservation.StartTime).ToString(), TimeZone.CurrentTimeZone.ToLocalTime(reservation.EndTime).ToString(), company.Name);

            emailService.SendEmail(reservation.Email, "Varaus peruutettu", reservationMessage);
            return Ok();
        }

        //[Authorize]
        [HttpGet("get-product-all-reservations")]
        public ActionResult<List<Reservation>> GetReservations(int productId)
        {
            var reservations = Reservation.GetReservations(productId, context).OrderBy(p => p.StartTime);
            return Ok(reservations);
        }

        //[Authorize]
        [HttpGet("get-product-valid-future-reservations")]
        public ActionResult<List<Reservation>> GetFutureReservations(int productId)
        {
            var reservations = Reservation.GetReservations(productId, context).Where(
                p => p.EndTime >= DateTime.Now
                && p.Status != Reservation.ReservationStatus.Rejected
                && p.Status != Reservation.ReservationStatus.Cancelled)
                .OrderBy(p => p.StartTime);
            return Ok(reservations);
        }

    }
}