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
                "<div>Hei {0}</div> " +
                "<h1>Varaus luotu {1}</h1>" +
                "<h1>Odotathan vielä, että yritys vahvistaa tilauksesi</h1>" +
                "<p>Laina-aika alkaa {2} ja päättyy {3}</p>" +
                "<p>Mukavaa paljuilua</p>"
                , reservation.FirstName, reservation.Product.Name, reservation.StartTime.ToShortDateString(), reservation.EndTime.ToShortDateString());

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