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

        [HttpPost("CreateReservation")]
        public async Task<ActionResult<Reservation>> Create(Reservation reservation)
        {

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
            return new Reservation();
        }
    }
}