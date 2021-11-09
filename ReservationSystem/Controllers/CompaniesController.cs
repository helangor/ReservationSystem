using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystemBackend.Data;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly DataContext _context;

        public CompaniesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Company>> GetCompanies()
        {
            var companies = _context.Companies.ToList();

            return companies;
        }


        [HttpGet("{id}")]
        public ActionResult<Company> GetCompany(int id)
        {
            var company = _context.Companies.Find(id);

            return company;
        }
    }
}
