using FluentValidation;
using FluentValidation.AspNetCore;
using Halo.Api.Common;
using Halo.Api.Common.Json;
using Halo.Api.Filters;
using Halo.Api.Middlewares;
using Halo.Application.DependencyInjection;
using Halo.Application.Interfaces.Services;
using Halo.Application.Mappings;
using Halo.Application.Services;
using Halo.Application.Validators;
using Halo.Infrastructure.DependencyInjection;
using Halo.Infrastructure.Schedulers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Halo.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // =========================
        // Load configuration
        // =========================

        var configuration = builder.Configuration;
        var environment = builder.Environment;

        // =========================
        // Configure Services
        // =========================

        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<ApiResponseWrapperFilter>();
        })
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new FlexibleEnumConverterFactory());
        });
        //.AddJsonOptions(options =>
        // {
        //     options.JsonSerializerOptions.Converters.Add(
        //         new JsonStringEnumConverter() // No naming policy = PascalCase
        //     );
        // });

        builder.Services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var errors = context.ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .SelectMany(x => x.Value!.Errors.Select(err => new
                    {
                        field = x.Key,
                        error = err.ErrorMessage
                    }))
                    .ToList();

                var traceId = context.HttpContext.TraceIdentifier;
                var correlationId = context.HttpContext.Items.ContainsKey("CorrelationId")
                    ? context.HttpContext.Items["CorrelationId"]?.ToString()
                    : null;

                var response = ApiResponse<object>.Failure("Validation failed.", errors, 400);
                response.TraceId = traceId;
                response.CorrelationId = correlationId;

                return new BadRequestObjectResult(response);
            };
        });

        builder.Services.AddScoped<ApiResponseWrapperFilter>();

        // AutoMapper
        builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

        // FluentValidation
        builder.Services.AddValidatorsFromAssemblyContaining<CreateStudyDayDtoValidator>();
        builder.Services.AddFluentValidationAutoValidation();

        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

        builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                var jwtConfig = configuration.GetSection("Jwt");
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = jwtConfig["Issuer"],
                    ValidAudience = jwtConfig["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtConfig["Key"]!)
                    ),
                    ClockSkew = TimeSpan.Zero
                };
            });

        builder.Services.AddApplication();
        builder.Services.AddInfrastructure(configuration);
        builder.Services.AddQuartzJobs();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        // =========================
        // Build App
        // =========================

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.UseCors("AllowAll");

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
