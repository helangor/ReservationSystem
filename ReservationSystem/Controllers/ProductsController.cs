using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReservationSystem.DTOs;
using ReservationSystem.Entities;
using ReservationSystem.Enums;
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
            var products = await context.Products.Include(p => p.Photos).Include(p => p.PriceRows).ToListAsync();
            return Ok(products);
        }

        [HttpGet("{productName}")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productName)
        {
            var product = await context.Products.Include(p => p.Photos).Include(p => p.PriceRows).FirstOrDefaultAsync(c => c.Name == productName);
            var productToReturn = mapper.Map<Product>(product);
            return Ok(productToReturn);
        }

        [Authorize]
        [HttpGet("get-product-all-data")]
        public async Task<ActionResult<ProductDto>> GetProductAllData(string productName)
        {
            var product = await context.Products.Include(p => p.Photos).Include(p => p.PriceRows).Include(p => p.Reservations).FirstOrDefaultAsync(c => c.Name == productName);
            return Ok(product);
        }

        [HttpGet("get-reserved-days-for-product")]
        public ActionResult<List<DateTime>> GetReservedDaysForProduct(int productId)
        {
            var reservations = Reservation.GetReservations(productId, context);
            if (reservations == null)
                return Ok(reservations);
                        
            //TODO: Tämä kantahakuun suoraan
            var futureReservations = reservations.Where(r => r.EndTime >= DateTime.Now
            && r.Status != ReservationStatus.Rejected
            && r.Status != ReservationStatus.Cancelled
            ).ToList();

            var product = context.Products.Single(p => p.Id == productId);
            var reservationDays = new Reservation().GetReservedDaysList(futureReservations, product);

            return Ok(reservationDays);
        }

        [Authorize]
        [HttpPut("update-product")]
        public ActionResult UpdateProduct(Product product)
        {
            var currentProduct = context.Products.Include(p => p.PriceRows).FirstOrDefault(c => c.Id == product.Id);
            if (currentProduct != null)
            {
                currentProduct.ReservationEndTime = product.ReservationEndTime;
                currentProduct.ReservationStartTime = product.ReservationStartTime;
                currentProduct.Name = product.Name;
                currentProduct.Introduction = product.Introduction;
                currentProduct.City = product.City;
                currentProduct.PriceRows = product.PriceRows;
                context.SaveChanges();
            }
            
            return Ok();
        }

        [HttpGet("get-photos")]
        public async Task< ActionResult<List<Photo>>> GetPhotos(int id)
        {
            var query = from product in context.Products
                        where (product.Id == id)
                        select product.Photos;

            var photos = await query.ToListAsync();
            return Ok(photos);
        }

        [Authorize]
        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int productId)
        {
            var product = await context.Products.Include(p => p.Photos).FirstOrDefaultAsync(c => c.Id == productId);
            if (product == null) return NotFound("ProductNotFound");

            var result = await photoService.AddPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            //Here removes old photos. Change when in the future more photos is allowed.
            var photoIds = product.Photos.Select(photo => photo.PublicId).ToArray();
            if (photoIds.Length > 0)
            {
                var removeResult = await photoService.DeleteExistingPhotosAsync(photoIds);
                product.Photos.Clear();
            }

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
