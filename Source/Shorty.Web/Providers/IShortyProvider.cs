using System.Threading.Tasks;

namespace Shorty.Web.Providers
{
    public interface IShortyProvider
    {
        Task<string> ShortenUri(string longUri, string uriPrefix = "");

        Task<string> ResolveUri(string id);
    }
}
