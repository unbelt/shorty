using System.Diagnostics.CodeAnalysis;

namespace Shorty.Web.Config
{
    public interface IDatabaseConfiguration
    {
        string PostgreSqlUrl { get; set; }
    }

    [ExcludeFromCodeCoverage]
    internal sealed class DatabaseConfiguration : IDatabaseConfiguration
    {
        public string PostgreSqlUrl { get; set; }
    }
}
