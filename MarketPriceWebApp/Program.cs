using System.Globalization;
using MarketPriceWebApp.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

Initializer.Configure(builder.Services);

var app = builder.Build();

var cultureInfo = new CultureInfo("en-GB")
{
    NumberFormat =
    {
        CurrencySymbol = "€"
    }
};

CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Table}/{id?}",
    defaults: new
    {
        culture = "gb",
    }
    );

app.Run();
