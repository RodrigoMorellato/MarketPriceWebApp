using System.Globalization;
using static System.DateTime;

namespace MarketPriceWebApp.Helpers
{
    public static class DateTimeHelper
    {
        public static DateTime StringToDatetime(string value)
        {
            string[] formats = { "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy" };
            TryParseExact(value, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateTime);
            return dateTime;
        }
    }
}
