using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class BeeFitDbContext : DbContext
    {
        public BeeFitDbContext(DbContextOptions<BeeFitDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
