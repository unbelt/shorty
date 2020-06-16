using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Shorty.Web.Config;
using Microsoft.AspNetCore.Builder;

namespace Shorty.Web.Extensions
{
    [ExcludeFromCodeCoverage]
    internal static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseConfiguredSwagger(this IApplicationBuilder app, ApiConfiguration apiConfig)
        {
            app.UseSwagger(c => c.RouteTemplate = $"{apiConfig.Version}/{apiConfig.SourcePath}/{{documentName}}/{Constants.SWAGGER_FILE}")
               .UseSwaggerUI(c =>
               {
                   c.RoutePrefix = $"{apiConfig.Version}/{apiConfig.SourcePath}";
                   c.DisplayOperationId();
                   c.SwaggerEndpoint(
                           $"{apiConfig.Version}/{Constants.SWAGGER_FILE}",
                           $"{apiConfig.DocumentTitle} {apiConfig.DocumentVersion}"
                       );
               });

            return app;
        }

        public static IApplicationBuilder UseConfiguredSpa(this IApplicationBuilder app, ClientConfiguration clientConfig)
        {
            app.MapWhen(c => clientConfig.Routes.Any(c.Request.Path.Value.Contains), app =>
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = clientConfig.SourcePath;
                });
            });

            return app;
        }

        public static IApplicationBuilder UseConfiguredRedirect(this IApplicationBuilder app, ApiConfiguration apiConfig)
        {
            app.Use(async (context, next) =>
            {
                await next.Invoke();

                var path = context.Request.Path.Value;

                if (path != "/" && path.IndexOf(".") == -1)
                {
                    var uri = $"{context.Request.Host.Value}{path}";

                    context.Response.Redirect($"{apiConfig.Version}/api/resolve?{uri}");
                }
            });

            return app;
        }
    }
}
