using Halo.Application.Interfaces.Services;
using Halo.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Halo.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IStudyDayService, StudyDayService>();
            services.AddScoped<IVocabItemService, VocabItemService>();
            services.AddScoped<IListeningItemService, ListeningItemService>();
            services.AddScoped<ISpeakingItemService, SpeakingItemService>();
            services.AddScoped<IGrammarItemService, GrammarItemService>();
            services.AddScoped<IWritingItemService, WritingItemService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRefreshTokenService, RefreshTokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IJwtService, JwtService>();

            services.AddScoped<Microsoft.AspNetCore.Identity.IPasswordHasher<Domain.Entities.User>, Microsoft.AspNetCore.Identity.PasswordHasher<Domain.Entities.User>>();

            return services;
        }
    }
}
