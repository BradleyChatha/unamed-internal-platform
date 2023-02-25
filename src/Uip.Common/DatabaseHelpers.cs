using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Uip.Common;

public static class DatabaseHelpers
{
    public static Action<DbContextOptionsBuilder> UseNpgsqlFromConfiguration(
        IConfiguration configuration,
        string sectionName = "Database"
    )
    {
        var builder = new NpgsqlConnectionStringBuilder();
        configuration.GetSection(sectionName).Bind(builder);
        return options => options.UseNpgsql(builder.ConnectionString);
    }
}
