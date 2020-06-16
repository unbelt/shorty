using System.Diagnostics.CodeAnalysis;

namespace Shorty.Web.Config
{
    [ExcludeFromCodeCoverage]
    internal sealed class ApiConfiguration : IApiConfiguration
    {
        public string Version { get; set; }

        public string SourcePath { get; set; }

        public string DocumentName { get; set; }

        public string DocumentTitle { get; set; }

        public string DocumentVersion { get; set; }

        public int HttpCallTimeout { get; set; }
    }

    public interface IApiConfiguration
    {
        string Version { get; set; }

        string SourcePath { get; set; }

        string DocumentName { get; set; }

        string DocumentTitle { get; set; }

        string DocumentVersion { get; set; }

        int HttpCallTimeout { get; set; }
    }
}
