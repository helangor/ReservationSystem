using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystem.DTOs;
using ReservationSystem.Entities;
using ReservationSystem.Extensions;
using ReservationSystem.Interfaces;
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
        private readonly IPhotoService photoService;

        public ProductsController(DataContext context,
                                  IMapper mapper,
                                  IPhotoService photoService)
        {
            this.context = context;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await context.Products.Include(p => p.Photos).ToListAsync();
            return Ok(products);
        }

        [HttpGet("{productName}")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productName)
        {
            var product = await context.Products.Include(p => p.Photos).FirstOrDefaultAsync(c => c.Name == productName);
            var productToReturn = mapper.Map<Product>(product);
            return Ok(productToReturn);
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
        [HttpGet("get-reservations")]
        public ActionResult<List<Reservation>> GetReservations(int id)
        {
            var reservations = Reservation.GetReservations(id, context).OrderBy(p => p.StartTime);
            return Ok(reservations);
        }

        //[Authorize]
        [HttpGet("get-photos")]
        public ActionResult<List<Photo>> GetPhotos(int id)
        {
            var query = from product in context.Products
                        where (product.Id == id)
                        select product.Photos;

            var photos = query.SingleOrDefault();
            return Ok(photos);
        }

        //[Authorize]
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, string productName)
        {
            var product = await context.Products.FirstOrDefaultAsync(c => c.Name == productName);
            if (product == null) return NotFound("ProductNotFound");

            var result = await photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                Product = product
            };

            context.Photos.Add(photo);
            context.Products.Attach(photo.Product);
            await context.SaveChangesAsync();

            return mapper.Map<PhotoDto>(photo);
        }
    }
}
