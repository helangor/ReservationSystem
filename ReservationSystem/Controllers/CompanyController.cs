using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        //TODO: Näihin ja producteihin tarkistus, jossa hakee käyttäjälle servicestä sen kaikki companyt tai producktit ja vertaa onko samat. 

        public CompanyController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpGet("get-companies-by-username")]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompaniesByUserName(string username)
        {
            var companies = await context.Companies.Where(c => c.Users.Any(u => u.UserName == username.ToLower())).Include(p => p.Products).ToListAsync();
            return Ok(companies);
        }

        [Authorize]
        [HttpGet("get-company-by-product-id")]
        public ActionResult<Company> GetCompanyByProductId(int productId)
        {
            var company = Company.GetCompanyByProductId(productId, context);
            return Ok(company);
        }

        [Authorize]
        [HttpPut("update-company")]
        public ActionResult UpdateCompany(Company company)
        {
            var currentCompany = context.Companies.Single(c => c.Id == company.Id);
            if (currentCompany != null)
            {
                currentCompany.Name = company.Name;
                currentCompany.City = company.City;
                currentCompany.PhoneNumber = company.PhoneNumber;
                currentCompany.Email = company.Email;
                currentCompany.Introduction = company.Introduction;
                currentCompany.Address = company.Address;
                currentCompany.PostalCode = company.PostalCode;
                context.SaveChanges();
            }

            return Ok();
        }

    }
}
