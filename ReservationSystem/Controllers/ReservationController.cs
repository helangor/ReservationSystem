using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Entities;
using ReservationSystem.Enums;
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
            TimeZoneInfo localZone = TimeZoneInfo.Local;
            var startTime = TimeZoneInfo.ConvertTime(reservation.StartTime, localZone);
            var endTime = TimeZoneInfo.ConvertTime(reservation.EndTime, localZone);
            var company = Company.GetCompanyByProductId(reservation.Product.Id, context);

            reservation.Status = ReservationStatus.New;
            var customerReservationMessage = string.Format(
                "<div>Hei {0}!</div> " +
                "<p>Olemme vastaanottaneet varauksenne: {1} ajalle {2} - {3}</p>" +
                "<p>Vuokraavan yrityksen tiedot:</p>" +
                "<p>{4}</p>" +
                "<p>{5}</p>" +
                "<br>" +
                "<p>Mukavaa paljuilua toivottaa, </p>" +
                "<p>Paljumies, www.paljumies.fi</p>",
                reservation.Name, reservation.Id, startTime.ToString(), endTime.ToString(), reservation.Product.Name, reservation.Product.City);
            emailService.SendEmail(reservation.Email, "Varausvahvistus", customerReservationMessage);

            var companyReservationMessage = string.Format(
            "<div>Hei {0}!</div> " +
            "<p>Paljunne on varattu ajalle {1} - {2}</p>" +
            "<p>Varausnumero: {3}</p>" +
            "<p>Varaajan tiedot:</p>" +
            "<p>Nimi: {4} </p>" +
            "<p>Puhelinnumero: {5}</p>" +
            "<p>Sähköposti: {6}</p>" +
            "<p>Viesti: {7}</p>" +
            "<br>" +
            "<p>Paljujen paras välittäjä</p>" +
            "<p>Paljumies, www.paljumies.fi</p>",
            company.Name, startTime.ToString(), endTime.ToString(), reservation.Id, reservation.Name,  reservation.PhoneNumber, reservation.Email, reservation.ExtraInfo);
            emailService.SendEmail(company.Email, "Varausvahvistus", companyReservationMessage);

            //Kludge. Ettei valita kuvien ID keystä
            reservation.Product.Photos = null;
            context.Reservations.Add(reservation);
            context.Products.Attach(reservation.Product);
            await context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost("cancel-reservation")]
        public async Task<ActionResult> CancelReservation(Reservation reservation)
        {
            var entity = context.Reservations.Include(p => p.Product).FirstOrDefault(item => item.Id == reservation.Id);
            if (entity != null)
            {
                entity.Status = ReservationStatus.Cancelled;
                context.Reservations.Update(entity);
                await context.SaveChangesAsync();
            }

            var company = Company.GetCompanyByProductId(entity.Product.Id, context);

            TimeZoneInfo localZone = TimeZoneInfo.Local;
            var startTime = TimeZoneInfo.ConvertTime(reservation.StartTime, localZone);
            var endTime = TimeZoneInfo.ConvertTime(reservation.EndTime, localZone);

            var reservationMessage = string.Format(
                "<div>Hei {0}!</div> " +
                "<p>Vuokranantaja on peruuttanut varauksenne ajalle {1} - {2}</p>" +
                "<p>Jos asiasta heräsi kysyttävää, olkaa yhteydessä vuokraavaan yritykseen </p>" +
                "<p>Vuokraavan yrityksen tiedot:</p>" +
                "<p>{3}</p>" +
                "<br>" +
                "<p>Paljumies, www.paljumies.fi</p>",
                reservation.Name, startTime.ToString(), endTime.ToString(), company.Name);

            emailService.SendEmail(reservation.Email, "Varaus peruutettu", reservationMessage);
            return Ok();
        }

        [Authorize]
        [HttpGet("get-product-all-reservations")]
        public ActionResult<List<Reservation>> GetReservations(int productId)
        {
            var reservations = Reservation.GetReservations(productId, context).OrderBy(p => p.StartTime);
            return Ok(reservations);
        }

        [Authorize]
        [HttpGet("get-product-valid-future-reservations")]
        public ActionResult<List<Reservation>> GetFutureReservations(int productId)
        {
            var reservations = Reservation.GetReservations(productId, context).Where(
                p => p.EndTime >= DateTime.Now
                && p.Status != ReservationStatus.Rejected
                && p.Status != ReservationStatus.Cancelled)
                .OrderBy(p => p.StartTime);
            return Ok(reservations);
        }

    }
}