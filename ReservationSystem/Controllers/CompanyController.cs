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
    public class CompanyController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public CompanyController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("GetCompaniesByUserName")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesByUserName(string username)
        {
            var companies = await context.Companies.Where(c => c.Users.Any(u => u.UserName == username.ToLower())).Include(p => p.Products).ToListAsync();
            return Ok(companies);
        }
    }
}
