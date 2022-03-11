namespace MarketPriceWebApp.Models
{
    public class MarketPriceViewModel
    {
        public MarketPriceViewModel(DateTime date, decimal price)
        {
            Date = date;
            Price = price;
        }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
