using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Configuration;

namespace Shorty.Web.Extensions
{
    [ExcludeFromCodeCoverage]
    internal static class ConfigurationExtensions
    {
        /// <summary>
        /// Get configuration from appsettings.json
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="configuration"></param>
        /// <returns>Configuration model based on T</returns>
        public static T FromAppSettgins<T>(this IConfiguration configuration)
        {
            var fullTypeName = typeof(T).Name;
            var lengthOfName = fullTypeName.LastIndexOf(Constants.CONFIGURATION_KEY);
            var truncatedTypeName = lengthOfName > 0
                ? fullTypeName.Substring(0, lengthOfName)
                : fullTypeName;

            return configuration.GetSection(truncatedTypeName).Get<T>();
        }
    }
}
