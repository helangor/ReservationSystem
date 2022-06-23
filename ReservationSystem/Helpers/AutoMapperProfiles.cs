using AutoMapper;
using ReservationSystem.DTOs;
using ReservationSystem.Entities;
using ReservationSystemBackend.Entities;

namespace ReservationSystem.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<Product, ProductDto>();
        }
    }
}
