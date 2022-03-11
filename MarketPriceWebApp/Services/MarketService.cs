using MarketPriceWebApp.Helpers;
using MarketPriceWebApp.Models;
using MarketPriceWebApp.Services.Interfaces;

namespace MarketPriceWebApp.Services
{
    public class MarketService : IMarketService
    {
        private readonly IConfiguration _configuration;

        public MarketService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<MarketViewModel> GetPricesDataForDisplay()
        {
            var fileCollection = await FileHelper.ReadCsv(Path.GetTempPath(), _configuration.GetSection("AppSettings:sampleSheetFileName").Value);
            return await LoadInfoFromCollection(fileCollection);
        }

        public async Task<MarketViewModel> GetByDate(DateTime date)
        {
            var fileCollection = await FileHelper.ReadCsv(Path.GetTempPath(), _configuration.GetSection("AppSettings:sampleSheetFileName").Value);
            return await LoadInfoFromCollection(fileCollection, date);
        }

        #region PrivateMethods

        private Task<MarketViewModel> LoadInfoFromCollection(IEnumerable<string> fileCollection, DateTime? date = null)
        {
            var market = new MarketViewModel();
            var index = 0;
            foreach (var line in fileCollection)
            {
                var lineSplited = line.Split(',');
                var dateTimePrice = DateTimeHelper.StringToDatetime(lineSplited[0]);
                if (date != null && date.Value.Date != dateTimePrice.Date)
                    continue;

                market.MarketPrices.Add(index++, new MarketPriceViewModel(dateTimePrice, DecimalHelper.StringToDecimal(lineSplited[1])));
            }

            return Task.FromResult(market);
        }

        #endregion
    }
}
