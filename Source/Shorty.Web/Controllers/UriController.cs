using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Mime;
using Shorty.Web.Providers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace Shorty.Web.Controllers
{
    public class UriController : BaseController
    {
        private readonly IShortyProvider _shortyProvider;

        public UriController(IShortyProvider shortyProvider)
        {
            _shortyProvider = shortyProvider;
        }

        /// <summary>
        /// Transform long URI to a short one.
        /// </summary>
        /// <param name="uri">
        /// <param name="uriPrefix">
        /// <returns>Shortened URI with a prefix if any.</returns>
        [HttpGet("shorten")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Shorten([Required] string uri, string uriPrefix = "")
        {
            try
            {
                var uriId = await _shortyProvider.ShortenUri(uri, uriPrefix);

                if (string.IsNullOrWhiteSpace(uriId))
                {
                    return BadRequest("URI creation failed.");
                }

                var shortUri = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}/{uriId}";

                return Ok(shortUri);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Resolve long uri from the short one.
        /// </summary>
        /// <param name="shortUri">
        /// <returns>The original URI.</returns>
        [HttpGet("resolve")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status302Found)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Resolve(string id, bool redirect = true)
        {
            // 100% query if not param
            var query = string.IsNullOrWhiteSpace(id) ?
                QueryHelpers.ParseQuery(HttpContext.Request.QueryString.Value).First().Key.Split('/').LastOrDefault() :
                id.Split('/').LastOrDefault();

            try
            {
                var uri = await _shortyProvider.ResolveUri(query);

                if (!redirect && string.IsNullOrWhiteSpace(uri))
                {
                    return NotFound();
                }

                if (redirect)
                {
                    return Redirect(string.IsNullOrWhiteSpace(uri) ? "/not-found" : uri);
                }

                return Ok(uri);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
