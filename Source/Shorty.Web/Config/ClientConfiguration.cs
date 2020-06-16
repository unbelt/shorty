using System.Diagnostics.CodeAnalysis;

namespace Shorty.Web.Config
{
    [ExcludeFromCodeCoverage]
    internal sealed class ClientConfiguration : IClientConfiguration
    {
        public string SourcePath { get; set; }

        public string DistPath { get; set; }

        public string[] Routes { get; set; }
    }

    public interface IClientConfiguration
    {
        string SourcePath { get; set; }

        string DistPath { get; set; }

        string[] Routes { get; set; }
    }
}
