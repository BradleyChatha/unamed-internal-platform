using Microsoft.EntityFrameworkCore;

namespace Uip.Common.Testing;

public interface IFixtureCompatibleDbContext<ContextT>
    where ContextT : DbContext
{
    public static abstract ContextT CreateFixture(DbContextOptions<ContextT> options);
}
