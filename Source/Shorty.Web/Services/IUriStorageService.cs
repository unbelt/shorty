using System.Collections.Generic;
using Shorty.Web.Models;

namespace Shorty.Web.Services
{
    public interface IUriStorageService
    {
        List<Uri> Get();

        Uri Get(string id);

        Uri Create(Uri uri);

        void Update(Uri uri);

        void Remove(Uri uri);

        void Remove(string id);
    }
}
