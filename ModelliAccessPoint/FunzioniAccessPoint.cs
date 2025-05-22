using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelliAccessPoint
{
    public class FunzioniAccessPoint
    {
        public static async Task<AccessPoint[]> DaiAccessPoint()
        {
            string BaseUri = "https://opendata.unife.it/access-points/unife-access-points.json";

            HttpClient httpClient = new HttpClient();

            var response = await httpClient.GetAsync(BaseUri);
            string contents = await response.Content.ReadAsStringAsync();

            AccessPoint[] deserialised = JsonConvert.DeserializeObject<AccessPoint[]>(contents);

            return deserialised;
        }

        public static async Task<AccessPoint[]> RicercaEdificioAccessPoint(string Edificio)
        {
            AccessPoint[] TuttiAP = await DaiAccessPoint();

            return TuttiAP.Where(AP => AP.Edificio.ToLower().Contains(Edificio.ToLower())).ToArray();
        }
    }
}
