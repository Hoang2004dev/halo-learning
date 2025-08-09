using Halo.Application.Interfaces.Repositories;
using Halo.Infrastructure.Persistence.DbContexts;

namespace Halo.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HaloDbContext _context;

        public UnitOfWork(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
