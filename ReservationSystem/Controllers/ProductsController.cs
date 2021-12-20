using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.DTOs;
using ReservationSystem.Entities;
using ReservationSystemBackend.Data;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public ProductsController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }

        [HttpGet("{productName}")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productName)
        {
            var product = await context.Products.FirstOrDefaultAsync(c => c.Name == productName);
            var productToReturn = mapper.Map<Product>(product);
            return Ok(productToReturn);
        }

        [HttpGet("GetProductsByUsername")]
        public ActionResult<ProductDto> GetProductsByUsername(string username)
        {
            var query = from company in context.Companies
                        where company.Users.Any(c => c.UserName == username)
                        select company.Products;

            var products = query.ToList();

            //TODO: Tähän järkevämpi tapa
            var productsToReturn = mapper.Map<IEnumerable<ProductDto>>(products[0]);

            return Ok(productsToReturn);
        }

        [HttpGet("GetReservedDays")]
        public ActionResult<List<DateTime>> GetReservedDays(int id)
        {
            var reservations = Reservation.GetReservations(id, context);
            if (reservations == null)
                return Ok(reservations);
                        
            //TODO: Tämä kantahakuun suoraan
            var futureReservations = reservations.Where(r => r.EndTime > DateTime.Now).ToList();

            var reservationDays = new Reservation().GetReservedDaysList(futureReservations);
            return Ok(reservationDays);
        }

        //[Authorize]
        [HttpGet("GetReservations")]
        public ActionResult<List<Reservation>> GetReservations(int id)
        {
            var reservations = Reservation.GetReservations(id, context).OrderBy(p => p.StartTime);
            return Ok(reservations);
        }
    }
}
