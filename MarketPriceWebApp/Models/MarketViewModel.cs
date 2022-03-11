namespace MarketPriceWebApp.Models
{
    public class MarketViewModel
    {
        public MarketViewModel()
        {
            MarketPrices = new Dictionary<int, MarketPriceViewModel>();
        }

        public Dictionary<int, MarketPriceViewModel> MarketPrices { get; set; }
    }
}
