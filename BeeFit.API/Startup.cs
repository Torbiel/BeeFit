using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeeFit.API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using BeeFit.API.Data.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BeeFit.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // The order of adding services doesn't matter.
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddMvcOptions(options => options.EnableEndpointRouting = false);
            services.AddDbContext<BeeFitDbContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.AddCors();
            // Scoped service is created once per request
            // https://stackoverflow.com/questions/38138100/addtransient-addscoped-and-addsingleton-services-differences
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                                .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                            ValidateIssuer = false, // is localhost in dev
                            ValidateAudience = false // same
                        };
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // The order here does matter.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // CORS, allowing any origins etc. for development
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
