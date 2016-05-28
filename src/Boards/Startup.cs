using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.PlatformAbstractions;
using Boards.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using AutoMapper;
using Boards.ViewModels;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authentication.Cookies;
using System.Net;

namespace Boards
{
    public class Startup
    {

        public static IConfigurationRoot Configuration;

        public Startup(IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<BoardsUser, IdentityRole>(config =>
            {
                config.Password.RequiredLength = 8;
                config.Cookies.ApplicationCookie.LoginPath = "/";
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") &&
                            ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return System.Threading.Tasks.Task.FromResult(0);
                    }
                };
            })
            .AddEntityFrameworkStores<BoardsContext>();

            services.AddMvc(config => {
#if !DEBUG
                // Requiring HTTPS currently leads to a redirect loop on Azure. Disabling this feature for now.
                // config.Filters.Add(new RequireHttpsAttribute());
#endif
            })
            .AddJsonOptions(opt => {
                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddLogging();
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<BoardsContext>();

            services.AddTransient<BoardsContextSeedData>();
            services.AddScoped<IBoardsRepository, BoardsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IServiceProvider serviceProvider, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                loggerFactory.AddDebug(LogLevel.Information);
                app.UseDeveloperExceptionPage();
            }
            else
            {
                loggerFactory.AddDebug(LogLevel.Error);
            }

            app.UseStaticFiles();
            app.UseIdentity();
            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Static Pages",
                    template: "{action}",
                    defaults: new { controller = "App", action = "Index" }
                );
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "App", action = "Index" }
                );
                config.MapRoute(
                    name: "404 - Page Not Found",
                    template: "{*url}",
                    defaults: new { controller = "App", action = "PageNotFound" }
                );
            });

            Mapper.Initialize(config =>
            {
                config.CreateMap<Board, BoardViewModel>().ReverseMap();
                config.CreateMap<Category, CategoryViewModel>().ReverseMap();
                config.CreateMap<Phase, PhaseViewModel>().ReverseMap();
                config.CreateMap<Boards.Models.Task, TaskViewModel>().ReverseMap();
            });

            if (env.IsDevelopment())
            {
                var seeder = serviceProvider.GetService<BoardsContextSeedData>();
                await seeder.EnsureSeedDataAsync();
            }
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
