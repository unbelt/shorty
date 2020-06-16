using Microsoft.AspNetCore.Mvc;

namespace Shorty.Web.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Produces("application/json")]
    public abstract class BaseController : Controller
    {
    }
}
