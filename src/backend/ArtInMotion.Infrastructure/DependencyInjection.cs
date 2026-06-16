using ArtInMotion.Application.Common.Interfaces;
using ArtInMotion.Domain.Interfaces;
using ArtInMotion.Infrastructure.Persistence;
using ArtInMotion.Infrastructure.Persistence.Repositories;
using ArtInMotion.Infrastructure.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArtInMotion.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Data Source=artinmotion.db";

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(connectionString));

        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());
        services.AddScoped<ISessionRepository, SessionRepository>();
        services.AddScoped<IPerformerRepository, PerformerRepository>();
        services.AddScoped<IStreamSessionRepository, StreamSessionRepository>();
        services.AddScoped<IPoseFrameRepository, PoseFrameRepository>();
        services.AddScoped<IPoseHubNotifier, PoseHubNotifier>();

        return services;
    }
}
