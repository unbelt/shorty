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
        private readonly IDatabaseConfiguration _dbConfig;

        public UriStorageService(IConfiguration configuration)
        {
            _dbConfig = configuration.FromAppSettgins<DatabaseConfiguration>();
        }

        public async Task<Uri> Get(string id)
        {
            using var connection = new NpgsqlConnection(_dbConfig.PostgreSqlConnectionString);

            var uri = await connection.QueryFirstOrDefaultAsync<Uri>("SELECT id, value FROM url WHERE id = @id", new { id });

            return uri;
        }

        public async Task<bool> Create(Uri uri)
        {
            using var connection = new NpgsqlConnection(_dbConfig.PostgreSqlConnectionString);

            var affected = await connection.ExecuteAsync("INSERT INTO url (id, value) VALUES (@Id, @Value)", new
            {
                uri.Id,
                uri.Value,
            });

            return affected != 0;
        }

        public async Task<bool> Update(Uri uri)
        {
            using var connection = new NpgsqlConnection(_dbConfig.PostgreSqlConnectionString);

            var affected = await connection.ExecuteAsync("UPDATE url SET value = @Value WHERE id = @Id", new
            {
                uri.Value,
                uri.Id,
            });

            return affected != 0;
        }

        public async Task<bool> Delete(string id)
        {
            using var connection = new NpgsqlConnection(_dbConfig.PostgreSqlConnectionString);

            var affected = await connection.ExecuteAsync("DELETE FROM url WHERE id = @id", new { id });

            return affected != 0;
        }
    }
}
