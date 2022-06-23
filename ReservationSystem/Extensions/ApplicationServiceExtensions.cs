using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReservationSystem.Data;
using ReservationSystem.Helpers;
using ReservationSystem.Interfaces;
using ReservationSystem.Services;
using ReservationSystemBackend.Data;

namespace ReservationSystem.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.Configure<EmailServiceSettings>(config.GetSection("EmailServiceSettings"));
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql("Host=localhost;Database=reservationcalendar;Username=testuser;Password=testuser");
            });

            return services;
        }
    }
}
