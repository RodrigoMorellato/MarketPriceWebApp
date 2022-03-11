using MarketPriceWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using MarketPriceWebApp.Services.Interfaces;

namespace MarketPriceWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IMarketService _marketService;

        public HomeController(ILogger<HomeController> logger, IMarketService marketService)
        {
            _logger = logger;
            _marketService = marketService;
        }

        public Task<IActionResult> Table()
        {
            return Task.FromResult<IActionResult>(View());
        }

        /// <summary>
        /// Get all prices from the provided document
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPricesDataForDisplay()
        {
            try
            {
                var mkViewModel = await _marketService.GetPricesDataForDisplay();
                return PartialView("_GridMarketPrice", mkViewModel);
            }
            catch
            {
                return Redirect("Error");
            }
        }

        public Task<IActionResult> Dashboard()
        {
            return Task.FromResult<IActionResult>(View());
        }

        /// <summary>
        /// Get prices based on a specific date
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPricesByDate(string date)
        {
            MarketViewModel mkViewModel;
            try
            {
                var patterns = new [] {"dd/MM/yyyy", "MM/dd/yyyy"};
                var fdate = DateTime.ParseExact(date, patterns, CultureInfo.InvariantCulture);
                mkViewModel = await _marketService.GetByDate(fdate);
                var pricesByDate = (from o in mkViewModel.MarketPrices
                                    select new { Date = o.Value.Date.ToShortTimeString(), Price = Math.Round(o.Value.Price, 2).ToString("0.00", new CultureInfo("en-GB")) }).ToList();

                return Json(pricesByDate);
            }
            catch
            {
                return Redirect("Error");
            }
        }

        public IActionResult Overview()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}