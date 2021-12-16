using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.Entities;
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

        public ReservationController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost("CreateReservation")]
        public async Task<IActionResult> Create(Reservation reservation)
        {
            if (ModelState.IsValid)
            {
                context.Reservations.Add(reservation);
                context.Companies.Attach(reservation.Company);
                await context.SaveChangesAsync();
            }
            return Ok("Ok");
        }
    }
}
