using System.Collections.Generic;
using Shorty.Web.Config;
using Shorty.Web.Extensions;
using Shorty.Web.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Shorty.Web.Services
{
    public class UriStorageService : IUriStorageService
    {
        private readonly IMongoCollection<Uri> _uris;

        public UriStorageService(IConfiguration configuration)
        {
            var dbConfig = configuration.FromAppSettgins<DatabaseConfiguration>();

            var settings = new MongoClientSettings
            {
                RetryWrites = false,
                Server = new MongoServerAddress(dbConfig.Endpoint, dbConfig.Port),
                Credential = MongoCredential.CreateCredential(dbConfig.Name, dbConfig.Name, dbConfig.Password)
            };
            var client = new MongoClient(settings);
            var database = client.GetDatabase(dbConfig.Name);

            _uris = database.GetCollection<Uri>(dbConfig.UriCollectionName);
        }

        public List<Uri> Get() =>
             _uris.Find(uri => true).ToList();

        public Uri Get(string id) =>
             _uris.Find(uri => uri.Id == id).FirstOrDefault();

        public Uri Create(Uri uri)
        {
            _uris.InsertOne(uri);

            return uri;
        }

        public void Update(Uri uri) =>
             _uris.ReplaceOne(u => u.Id == uri.Id, uri);

        public void Remove(Uri uri) =>
             _uris.DeleteOne(u => u.Id == uri.Id);

        public void Remove(string id) =>
             _uris.DeleteOne(uri => uri.Id == id);
    }
}
