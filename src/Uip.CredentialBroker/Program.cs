using FluentValidation;
using Uip.CredentialBroker.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapGrpcReflectionService();

app.UseRouting();
app.MapGrpcService<DatabaseBrokerService>();

app.Run();
