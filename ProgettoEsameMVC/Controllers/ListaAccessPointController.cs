using Microsoft.AspNetCore.Mvc;
using ModelliAccessPoint;
using ProgettoEsameMVC.Models.ViewModels;

namespace ProgettoEsameMVC.Controllers
{
    public class ListaAccessPointController : Controller
    {
        [HttpGet]
        public IActionResult VisualizzaAccessPoint()
        {
            ListaAccessPointVisualizzaAccessPointViewModel VM = new ListaAccessPointVisualizzaAccessPointViewModel();

            AccessPoint[] ElencoAccessPoint = FunzioniAccessPoint.DaiAccessPoint().Result;

            VM.ElencoAccessPoint = ElencoAccessPoint;

            return View(VM);
        }
    }
}
