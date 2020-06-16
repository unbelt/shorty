using System;
using Shorty.Web.Config;
using Shorty.Web.Extensions;
using Shorty.Web.Middleware;
using Shorty.Web.Providers;
using Shorty.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Shorty.Web
{
    public class Startup
    {
        private readonly ApiConfiguration _apiConfig;
        private readonly ClientConfiguration _clientConfig;
        private readonly IHostEnvironment _hostingEnvironment;

        public Startup(IHostEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _apiConfig = configuration.FromAppSettgins<ApiConfiguration>();
            _clientConfig = configuration.FromAppSettgins<ClientConfiguration>();
            _hostingEnvironment = hostingEnvironment;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (_hostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseConfiguredSwagger(_apiConfig);
            app.UseConfiguredSpa(_clientConfig);
            app.UseConfiguredRedirect(_apiConfig);
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(option =>
            {
                option.EnableEndpointRouting = false;
                option.UseGeneralRoutePrefix(Constants.GENERAL_ROUTE_PREFIX);
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddApiVersioning(options => options.ReportApiVersions = true);

            services.AddSwaggerDocument(_apiConfig).AddMemoryCache();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = _clientConfig.DistPath);

            services.AddSingleton<IShortyProvider, ShortyProvider>();
            services.AddSingleton<IUriStorageService, UriStorageService>();

            (var container, var serviceProvider) = services.InitializeAutofac(GetType().Assembly);

            return serviceProvider;
        }
    }
}
