using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Uip.Common;
using Uip.Common.Auth;
using Uip.Permissions.Implementations.Composable;
using Uip.Permissions.Implementations.Database;
using Uip.Permissions.Implementations.Database.Model;
using Uip.Permissions.Interfaces;
using Uip.Permissions.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddDbContextFactory<PermissionsDbContext>(
    DatabaseHelpers.UseNpgsqlFromConfiguration(builder.Configuration)
);
builder.Services
    .AddAuthentication()
    .AddScheme<KratosAuthenticationOptions, KratosAuthenticationHandler>(
        KratosAuthenticationHandler.SchemeName,
        options => { }
    );
builder.Services.AddAuthorization();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddSingleton<Ory.Kratos.Client.Api.IFrontendApiAsync>(_ =>
{
    var config = new Ory.Kratos.Client.Client.Configuration();
    builder.Configuration.Bind("Kratos", config);
    return new Ory.Kratos.Client.Api.FrontendApi(config);
});
builder.Services.AddScoped<IPermissionStoreAsync, DatabasePermissionStoreAsync>();
builder.Services.AddScoped<IPermissionCheckerAsync, DatastoreBackedPermissionCheckerAsync>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    using var db = scope.ServiceProvider.GetRequiredService<PermissionsDbContext>();
    db.Database.Migrate();

    app.MapGrpcReflectionService();
}

app.UseRouting();
app.UseGrpcWeb();
app.UseAuthentication();
app.UseAuthorization();

app.MapGrpcService<PermissionsService>().EnableGrpcWeb();

app.Run();
