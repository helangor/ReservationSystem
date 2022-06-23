using Microsoft.EntityFrameworkCore;
using ReservationSystem.Entities;
using ReservationSystemBackend.Entities;

namespace ReservationSystemBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PriceRow> PriceRows { get; set; }

        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
