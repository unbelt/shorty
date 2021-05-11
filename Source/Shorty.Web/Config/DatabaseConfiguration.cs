using System.Diagnostics.CodeAnalysis;

namespace Shorty.Web.Config
{
    public interface IDatabaseConfiguration
    {
        string PostgreSqlConnectionString { get; set; }
    }

    [ExcludeFromCodeCoverage]
    internal sealed class DatabaseConfiguration : IDatabaseConfiguration
    {
        public string PostgreSqlConnectionString { get; set; }
    }
}
