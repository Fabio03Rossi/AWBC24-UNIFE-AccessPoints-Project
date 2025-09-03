using ModelliAccessPoint;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ProgettoEsameMVC.WSSoap
{
    [ServiceContract]
    public interface IUNIFEAccessPoint
    {
        [OperationContract]
        public AccessPoint[] RitornaTuttiGliAccessPoint();

        [OperationContract]
        public AccessPoint[] RicercaEdificioAccessPoint(string Ricerca);

    }

    public class ServizioUNIFEAccessPoint : IUNIFEAccessPoint
    {
        public AccessPoint[] RitornaTuttiGliAccessPoint()
        {
            return FunzioniAccessPoint.DaiAccessPoint().Result;
        }

        public AccessPoint[] RicercaEdificioAccessPoint(string Edificio)
        {
            return FunzioniAccessPoint.RicercaEdificioAccessPoint(Edificio).Result;
        }
    }
}
