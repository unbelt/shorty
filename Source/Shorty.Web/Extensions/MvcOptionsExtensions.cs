using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace Shorty.Web.Extensions
{
    [ExcludeFromCodeCoverage]
    internal static class MvcOptionsExtensions
    {
        public static void UseGeneralRoutePrefix(this MvcOptions options, IRouteTemplateProvider routeAttribute)
        {
            options.Conventions.Add(new RoutePrefixConvention(routeAttribute));
        }

        public static void UseGeneralRoutePrefix(this MvcOptions options, string prefix)
        {
            options.UseGeneralRoutePrefix(new RouteAttribute(prefix));
        }
    }
}
