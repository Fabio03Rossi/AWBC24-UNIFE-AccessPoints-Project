using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelliAccessPoint;

namespace RestTestApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccessPointController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public AccessPoint[] OttieniAccessPoint()
        {
            return FunzioniAccessPoint.DaiAccessPoint().Result;
        }

        [Authorize]
        [HttpGet]
        public AccessPoint[] RicercaEdificio(string Edificio)
        {
            return FunzioniAccessPoint.RicercaEdificioAccessPoint(Edificio).Result;
        }
    }
}
