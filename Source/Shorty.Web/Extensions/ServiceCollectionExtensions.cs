using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Shorty.Web.Config;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace Shorty.Web.Extensions
{
    [ExcludeFromCodeCoverage]
    internal static class ServiceCollectionExtensions
    {
        public static (IContainer Container, AutofacServiceProvider ServiceProvider)
            InitializeAutofac(this IServiceCollection services, Assembly startupAssembly)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);
            builder.RegisterAssemblyModules(startupAssembly);

            var container = builder.Build();
            var serviceProvider = new AutofacServiceProvider(container);

            return (Container: container, ServiceProvider: serviceProvider);
        }

        public static IServiceCollection AddSwaggerDocument(this IServiceCollection services, IApiConfiguration apiConfig)
        {
            var swaggerGen = services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    apiConfig.Version,
                    new OpenApiInfo
                    {
                        Title = apiConfig.DocumentTitle,
                        Version = apiConfig.DocumentVersion,
                        Contact = new OpenApiContact
                        {
                            Name = Constants.PROJECT_NAME,
                            Email = Constants.PROJECT_EMAIL
                        }
                    });
            });

            return swaggerGen;
        }
    }
}
