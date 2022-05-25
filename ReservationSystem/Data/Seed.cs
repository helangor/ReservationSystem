using Microsoft.EntityFrameworkCore;
using ReservationSystem.Entities;
using ReservationSystemBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReservationSystem.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Password"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            if (!context.Products.Any())
            {
                var priceRows = new List<PriceRow> {
                new PriceRow { Name = "Päivä", TimePeriod = Enums.TimePeriod.Day, Price = 100 },
                new PriceRow { Name = "Viikonloppu", TimePeriod = Enums.TimePeriod.Weekend, Price = 150 },
                new PriceRow { Name = "Viikko", TimePeriod = Enums.TimePeriod.Week, Price = 200 }
            };

                context.SaveChanges();
            }

            await context.SaveChangesAsync();
        }
    }
}
