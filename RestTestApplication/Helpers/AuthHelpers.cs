using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ProgettoEsameMVC.Helpers
{
    public class AuthHelpers
    {
        private readonly IConfiguration Configuration;

        public AuthHelpers(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string GeneraJWTToken(Utente user)
        {
            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.NameId, user.ID.ToString()),
                new Claim(JwtRegisteredClaimNames.AuthTime, DateTime.Now.ToShortTimeString()),
            };

            var jwtToken = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                       Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"])
                        ),
                    SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }
    }
}
