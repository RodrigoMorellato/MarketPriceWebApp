using MarketPriceWebApp.Models;

namespace MarketPriceWebApp.Services.Interfaces
{
    public interface IMarketService
    {
        Task<MarketViewModel> GetPricesDataForDisplay();
        //Task<MarketViewModel> GetAll();
        Task<MarketViewModel> GetByDate(DateTime date);
    }
}
