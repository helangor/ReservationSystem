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
        private readonly IEmailService emailService;

        public ReservationController(DataContext context, IEmailService emailService)
        {
            this.context = context;
            this.emailService = emailService;
        }

        [HttpPost("create-reservation")]
        public async Task<ActionResult> CreateReservation(Reservation reservation)
        {
            var company = Company.GetCompanyByProductId(reservation.Product.Id, context);

                var test = reservation.Id;

            //Kludge. Ettei valita kuvien ID keystä
            reservation.Product.Photos = null;
            context.Reservations.Add(reservation);
            context.Attach(reservation.Product);
            context.Attach(reservation.Product.PriceRows.First());
            await context.SaveChangesAsync();

            reservation.Status = ReservationStatus.New;

            emailService.SendEmail(reservation.Email, "Varausvahvistus", emailService.GetCustomerReservationMessage(reservation));
            emailService.SendEmail(company.Email, "Varausvahvistus", emailService.GetCompanyReservationMessage(company.Name, reservation));

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
            emailService.SendEmail(reservation.Email, "Varaus peruutettu", emailService.GetReservationMessage(company.Name, reservation));
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