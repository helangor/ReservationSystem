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

            var data = await System.IO.File.ReadAllTextAsync("Data/SeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(data);
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Password"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);

                foreach (var company in user.Companies)
                {
                    context.Companies.Add(company);
                    foreach (var product in company.Products)
                    {
                        context.Products.Add(product);
                        foreach (var priceRow in product.PriceRows)
                        {
                            context.PriceRows.Add(priceRow);
                        }
                    }
                }
            }


            await context.SaveChangesAsync();
        }
    }
}
