using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelliAccessPoint
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
    public class AccessPoint
    {
        public string ID { get; set; }

        [JsonProperty("Collocazione Edificio")]
        public string Edificio { get; set; }
        public string Marca { get; set; }
        public string Modello { get; set; }
        public string Tecnologia { get; set; }
    }
}
