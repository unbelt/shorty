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
                app.UseHttpsRedirection()
                    .UseExceptionHandler("/Error")
                    .UseHsts();
            }

            app.UseConfiguredSwagger(_apiConfig)
                .UseConfiguredSpa(_clientConfig)
                .UseConfiguredRedirect(_apiConfig)
                .UseMiddleware<ExceptionMiddleware>()
                .UseMvc()
                .UseDefaultFiles()
                .UseStaticFiles();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddApiVersioning(options => options.ReportApiVersions = true)
                .AddSwaggerDocument(_apiConfig)
                .AddMemoryCache()
                .AddSingleton<IShortyProvider, ShortyProvider>()
                .AddSingleton<IUriStorageService, UriStorageService>()
                .AddMvc(option =>
            {
                option.EnableEndpointRouting = false;
                option.UseGeneralRoutePrefix(Constants.GENERAL_ROUTE_PREFIX);
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = _clientConfig.DistPath);

            (var container, var serviceProvider) = services.InitializeAutofac(GetType().Assembly);

            return serviceProvider;
        }
    }
}
