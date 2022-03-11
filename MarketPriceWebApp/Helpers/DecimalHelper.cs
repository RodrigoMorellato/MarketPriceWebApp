using System.Globalization;

namespace MarketPriceWebApp.Helpers
{
    public static class DecimalHelper
    {
        public static decimal StringToDecimal(string value)
        {
            decimal.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out var valResult);
            return valResult;
        }
    }
}
