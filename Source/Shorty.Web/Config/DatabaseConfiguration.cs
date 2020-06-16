using System.Diagnostics.CodeAnalysis;

namespace Shorty.Web.Config
{
    [ExcludeFromCodeCoverage]
    internal sealed class DatabaseConfiguration : IDatabaseConfiguration
    {
        public string UriCollectionName { get; set; }

        public string Endpoint { get; set; }

        public int Port { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }
    }

    public interface IDatabaseConfiguration
    {
        string UriCollectionName { get; set; }

        string Endpoint { get; set; }

        public int Port { get; set; }

        string Name { get; set; }

        public string Password { get; set; }
    }
}
