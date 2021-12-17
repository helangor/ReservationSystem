using AutoMapper;
using ReservationSystem.DTOs;
using ReservationSystem.Entities;
using ReservationSystemBackend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<Company, CompanyDto>();
            CreateMap<Reservation, ReservationDto>();

        }
    }
}
