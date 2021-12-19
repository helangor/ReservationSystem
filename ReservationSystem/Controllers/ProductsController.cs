using AutoMapper;
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
            var product = await context.Products.FirstOrDefaultAsync(c => c.ProductName == productName);
            var productToReturn = mapper.Map<Product>(product);
            return Ok(productToReturn);
        }

        [HttpGet("GetProductsByUsername")]
        public  ActionResult<ProductDto> GetProductsByUsername(string username)
        {
            var query = from product in context.Products
                        where product.Users.Any(c => c.UserName == username)
                        select product;

            var products = query.ToList();
            var productsToReturn = mapper.Map<IEnumerable<ProductDto>>(products);

            return Ok(productsToReturn);
        }

        [HttpGet("GetReservedDays")]
        public ActionResult<List<DateTime>> GetReservedDays(int id)
        {
            var query = from products in context.Products
                        where (products.Id == id)
                        select products.Reservations;

            var reservations = query.Single();
            if (reservations.Count == 0)
            {
                return Ok(reservations);
            }

            //TODO: Tämä kantahakuun suoraan
            var futureReservations = reservations.Where(r => r.EndTime > DateTime.Now).ToList();

            var reservationDays = new Reservation().GetReservedDaysList(futureReservations);
            return Ok(reservationDays);
        }
    }
}
