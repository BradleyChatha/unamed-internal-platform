using Microsoft.EntityFrameworkCore;

namespace Uip.Common.Testing;

public class RandomDatabaseFixture<ContextT> : IDisposable
    where ContextT : DbContext, IFixtureCompatibleDbContext<ContextT>
{
    public const string INTEGRATION_TEST_DATABASE_HOST = "localhost";
    public const ushort INTEGRATION_TEST_DATABASE_PORT = 5433;
    public const string INTEGRATION_TEST_DATABASE_USER = "postgres";
    public const string INTEGRATION_TEST_DATABASE_PASS = "postgres";

    public ContextT Context;

    public RandomDatabaseFixture()
    {
        string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890_";
        string databaseName = new string(
            Enumerable.Repeat(chars, 32).Select(s => s[Random.Shared.Next(s.Length)]).ToArray()
        );

        var builder = new DbContextOptionsBuilder<ContextT>();
        builder.UseNpgsql(
            $"Host={INTEGRATION_TEST_DATABASE_HOST};Port={INTEGRATION_TEST_DATABASE_PORT};"
                + $"Username={INTEGRATION_TEST_DATABASE_USER};Password={INTEGRATION_TEST_DATABASE_PASS};"
                + $"Database={databaseName}"
        );

        this.Context = ContextT.CreateFixture(builder.Options);
        this.Context.Database.EnsureDeleted();
        this.Context.Database.Migrate();
    }

    public void Dispose()
    {
        if (this.Context != null)
        {
            this.Context.Database.EnsureDeleted();
            this.Context.Dispose();
        }
    }
}
