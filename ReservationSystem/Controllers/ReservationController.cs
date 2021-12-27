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
            context.Reservations.Add(reservation);
            context.Products.Attach(reservation.Product);
            await context.SaveChangesAsync();
            return new Reservation();
        }

        [HttpGet("SendTest")]
        public void Send()
        {
            //TODO: Testiä varten tässä.
           emailService.Send("henrikki.helander@gmail.com", "henrikki_helander@hotmail.com", "subj", "<p>html</p>");
            var test = 1;
        }
    }
}