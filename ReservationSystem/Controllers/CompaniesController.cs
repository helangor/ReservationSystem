﻿using AutoMapper;
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
    public class CompaniesController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public CompaniesController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await context.Companies.ToListAsync();
        }

        [HttpGet("{companyname}")]
        public async Task<ActionResult<CompanyDto>> GetCompany(string companyname)
        {
            var company = await context.Companies.FirstOrDefaultAsync(c => c.CompanyName == companyname);
            var companyToReturn = mapper.Map<Company>(company);
            return Ok(companyToReturn);
        }

        [HttpGet("GetCompaniesByUsername")]
        public  ActionResult<CompanyDto> GetCompaniesByUsername(string username)
        {
            var query = from company in context.Companies
                        where company.Users.Any(c => c.UserName == username)
                        select company;

            var companies = query.ToList();
            var companiesToReturn = mapper.Map<IEnumerable<CompanyDto>>(companies);

            return Ok(companiesToReturn);
        }

        [HttpGet("GetReservedDays")]
        public ActionResult<List<DateTime>> GetReservedDays(int id)
        {
            var query = from company in context.Companies
                        where (company.Id == id)
                        select company.Reservations;

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
