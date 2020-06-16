namespace Shorty.Web.Providers
{
    public interface IShortyProvider
    {
        string ShortenUri(string longUri, string uriPrefix = "");

        string ResolveUri(string id);
    }
}
