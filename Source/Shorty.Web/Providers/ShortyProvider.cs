using System;
using System.Threading.Tasks;
using Shorty.Web.Services;
using Microsoft.Extensions.Logging;

namespace Shorty.Web.Providers
{
    public class ShortyProvider : IShortyProvider
    {
        private const int GUID_LENGTH = 6;
        private readonly IUriStorageService _uriStorage;
        private readonly ILogger<ShortyProvider> _logger;

        public ShortyProvider(IUriStorageService uriStorage, ILogger<ShortyProvider> logger)
        {
            _uriStorage = uriStorage;
            _logger = logger;
        }

        public async Task<string> ShortenUri(string longUri, string uriPrefix = "")
        {
            if (!Uri.IsWellFormedUriString(longUri, UriKind.Absolute))
            {
                _logger.LogWarning($"The URI is not valid: {longUri}");

                return string.Empty;
            }

            var prefix = string.IsNullOrWhiteSpace(uriPrefix) ? string.Empty : $"{uriPrefix}-";
            var id = prefix + Guid.NewGuid().ToString().Substring(0, GUID_LENGTH);

            var newUri = new Models.Uri
            {
                Id = id,
                Value = longUri
            };

            var created = await _uriStorage.Create(newUri);

            return created ? newUri.Id : string.Empty;
        }

        public async Task<string> ResolveUri(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {

                _logger.LogWarning($"The URI ID is required! Provided ID: {id}");

                return string.Empty;
            }

            var uri = await _uriStorage.Get(id);

            if (uri == null)
            {
                _logger.LogWarning($"Cannot resolve URI with ID: {id}");

                return string.Empty;
            }

            return uri.Value;
        }
    }
}
