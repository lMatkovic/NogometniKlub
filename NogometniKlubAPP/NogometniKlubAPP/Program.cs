using NogometniKlubAPP.Data;
using NogometniKlubAPP.Extensions;
using NogometniKlubAPP.Mapping;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddNogometniKlubSwaggerGen();
builder.Services.AddNogometniKlubCORS();


// dodavanje baze podataka
builder.Services.AddDbContext<NogometniKlubContext>(
    opcije =>
    {
        opcije.UseSqlServer(builder.Configuration.GetConnectionString("NogometniKlubContext"));
    }
    );


// automapper
builder.Services.AddAutoMapper(typeof(NogometniKlubMappingProfile));


// SECURITY
builder.Services.AddNogometniKlubSecurity();
builder.Services.AddAuthorization();
// END SECURITY



var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(opcije => {
    opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    opcije.EnableTryItOutByDefault();
    opcije.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
});
//}

app.UseHttpsRedirection();

// SECURITY
app.UseAuthentication();
app.UseAuthorization();
// ENDSECURITY

app.MapControllers();

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");
// završio za potrebe produkcije

app.Run();