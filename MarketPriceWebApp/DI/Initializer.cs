using System.Globalization;
using MarketPriceWebApp.Services;
using MarketPriceWebApp.Services.Interfaces;

namespace MarketPriceWebApp.DI
{
    public class Initializer
    {

        public static void Configure(IServiceCollection services)
        {
            //Service
            services.AddScoped(typeof(IMarketService), typeof(MarketService));
        }
    }
}
