using BeeFit.API.Data;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using System;
using AutoMapper;

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
            services.AddSingleton<IMapper>(container =>
            {
                var contextAccessor = container.GetRequiredService<IHttpContextAccessor>();
                var autoMapperConfig = new MapperConfiguration(configuration =>
                {
                    configuration.AddProfile(new AutoMapperProfiles());
                });

                return new Mapper(autoMapperConfig);
            });

            services.AddCors();
            
            services.AddControllers()
                    .AddNewtonsoftJson(options => 
                                       {
                                           options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                                       });

            services.AddMvc(options => options.Filters.Add(typeof(DbSaveChangesFilter)))
                    .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                    .AddMvcOptions(options => options.EnableEndpointRouting = false);

            services.AddDbContext<BeeFitDbContext>(x => x.UseLazyLoadingProxies()
                                                         .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Scoped service is created once per request
            // https://stackoverflow.com/questions/38138100/addtransient-addscoped-and-addsingleton-services-differences
            services.AddScoped<IAuthRepository, AuthRepository>();

            // Adding repositories
            services.AddScoped<IBeeFitRepository, BeeFitRepository>();
            services.AddScoped<IDishesRepository, DishesRepository>();
            services.AddScoped<IIngredientsRepository, IngredientsRepository>();
            services.AddScoped<IMealsRepository, MealsRepository>();

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

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); // To retrieve current user

            services.AddScoped<LogUserActivity>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // The order here does matter.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }

            // CORS, allowing any origins etc. for development
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
