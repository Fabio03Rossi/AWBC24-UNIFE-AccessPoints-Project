using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using ProgettoEsameMVC.Helpers;
using RestTestApplication.Database;
using SQLitePCL;

namespace RestTestApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Utente login)
        {
            IActionResult response = Unauthorized();
            if (Autenticazione(login) == false)
            {
                return response;
            }

            if (login != null)
            {
                var tokenString = new AuthHelpers(_config).GeneraJWTToken(login);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private bool Autenticazione(Utente login)
        {
            var listaUtenti = new SQLiteDatabase().OttieniUtenteAsync(login).Result;

            foreach (var check in listaUtenti)
            {
                try { 
                    if (BCrypt.Net.BCrypt.Verify(login.Password, check.Password))
                    {
                        return true;
                    }
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }
    }
}
