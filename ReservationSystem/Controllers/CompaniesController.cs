using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBackend.Data;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly DataContext _context;

        public CompaniesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        /*[HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            return await _context.Companies.FindAsync(id);
        }*/

        [HttpGet("{companyname}")]
        public async Task<ActionResult<Company>> GetCompany(string companyname)
        {
            return await _context.Companies.FirstOrDefaultAsync(c => c.CompanyName == companyname);
        }

        [HttpGet("GetCompaniesByUsername")]
        public  ActionResult<Company> GetCompaniesByUsername(string username)
        {
            var query = from company in _context.Companies
                        where company.Users.Any(c => c.UserName == username)
                        select company;

            var companies = query.ToList();
            return Ok(companies);
        }
    }
}
