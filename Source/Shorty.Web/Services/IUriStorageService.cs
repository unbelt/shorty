using System.Threading.Tasks;
using Shorty.Web.Models;

namespace Shorty.Web.Services
{
    public interface IUriStorageService
    {
        Task<Uri> Get(string id);

        Task<bool> Create(Uri uri);

        Task<bool> Update(Uri uri);

        Task<bool> Delete(string id);
    }
}
