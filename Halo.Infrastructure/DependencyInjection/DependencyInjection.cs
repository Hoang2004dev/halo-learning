using Halo.Application.Interfaces.Repositories;
using Halo.Infrastructure.Persistence.DbContexts;
using Halo.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Halo.Infrastructure.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<HaloDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("PostgresConnection")));

            services.AddScoped<IStudyDayRepository, StudyDayRepository>();
            services.AddScoped<IVocabItemRepository, VocabItemRepository>();
            services.AddScoped<IListeningItemRepository, ListeningItemRepository>();
            services.AddScoped<ISpeakingItemRepository, SpeakingItemRepository>();
            services.AddScoped<IGrammarItemRepository, GrammarItemRepository>();
            services.AddScoped<IWritingItemRepository, WritingItemRepository>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}
