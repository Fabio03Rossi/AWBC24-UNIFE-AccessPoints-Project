using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModelliAccessPoint;
using ProgettoEsameMVC.Models.ViewModels;
using System.Security.Claims;

namespace ProgettoEsameMVC.Controllers
{
    public class ListaAccessPointController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult VisualizzaAccessPoint()
        {
            var utenteAttuale = HttpContext.User;
            ListaAccessPointVisualizzaAccessPointViewModel VM = new ListaAccessPointVisualizzaAccessPointViewModel();

            if (utenteAttuale.HasClaim(c => c.Type == ClaimTypes.Name))
            {
                AccessPoint[] ElencoAccessPoint = FunzioniAccessPoint.DaiAccessPoint().Result;
                VM.ElencoAccessPoint = ElencoAccessPoint;
            }

            return View(VM);
        }
    }
}
