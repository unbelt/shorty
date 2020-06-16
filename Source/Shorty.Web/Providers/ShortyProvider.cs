using System;
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

        public string ShortenUri(string longUri, string uriPrefix = "")
        {
            if (!Uri.IsWellFormedUriString(longUri, UriKind.Absolute))
            {
                var invalidUriMessage = $"The URI is not valid: {longUri}";

                _logger.LogWarning(invalidUriMessage);

                throw new ApplicationException(invalidUriMessage);
            }

            var prefix = string.IsNullOrWhiteSpace(uriPrefix) ? string.Empty : $"{uriPrefix}-";
            var id = prefix + Guid.NewGuid().ToString().Substring(0, GUID_LENGTH);

            var newUri = new Models.Uri
            {
                Id = id,
                Value = longUri
            };

            try
            {
                var uri = _uriStorage.Create(newUri);

                return uri.Id;
            }
            catch (Exception ex)
            {
                var storageFailMessage = $"Storage failed for URI: {longUri}";

                _logger.LogError(ex, storageFailMessage);

                throw new ApplicationException(storageFailMessage);
            }
        }

        public string ResolveUri(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ApplicationException($"The URI ID is required! Provided ID: {id}");
            }

            var uri = _uriStorage.Get(id);

            if (uri == null)
            {
                _logger.LogWarning($"Cannot resolve URI with ID: {id}");

                return string.Empty;
            }

            return uri.Value;
        }
    }
}
