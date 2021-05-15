using System.Threading.Tasks;
using Shorty.Web.Config;
using Shorty.Web.Extensions;
using Shorty.Web.Models;
using Microsoft.Extensions.Configuration;
using Dapper;
using Npgsql;

namespace Shorty.Web.Services
{
    public class UriStorageService : IUriStorageService
    {
        private static string ConnectionString;

        public UriStorageService(IConfiguration configuration)
        {
            var databaseUrl = System.Environment.GetEnvironmentVariable("DATABASE_URL")
               ?? configuration.FromAppSettgins<DatabaseConfiguration>()?.PostgreSqlUrl;

            var databaseUri = new System.Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = databaseUri.Host,
                Port = databaseUri.Port,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = databaseUri.LocalPath.TrimStart('/'),
                SslMode = SslMode.Require,
                TrustServerCertificate = true,
            };

            ConnectionString = builder.ConnectionString;
        }

        public async Task<Uri> Get(string id)
        {
            using var connection = new NpgsqlConnection(ConnectionString);

            var uri = await connection.QueryFirstOrDefaultAsync<Uri>("SELECT id, value FROM url WHERE id = @id", new { id });

            return uri;
        }

        public async Task<bool> Create(Uri uri)
            => await ExecuteAsync("INSERT INTO url (id, value) VALUES (@Id, @Value)", uri);

        public async Task<bool> Update(Uri uri)
            => await ExecuteAsync("UPDATE url SET value = @Value WHERE id = @Id", uri);

        public async Task<bool> Delete(string id)
            => await ExecuteAsync("DELETE FROM url WHERE id = @id", new { id });

        private async Task<bool> ExecuteAsync(string query, object values)
        {
            using var connection = new NpgsqlConnection(ConnectionString);

            var affected = await connection.ExecuteAsync(query, values);

            return affected != 0;
        }
    }
}
