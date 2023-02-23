from spyne import Application, rpc, ServiceBase, Integer, Unicode , Decimal
from spyne import Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
from wsgiref.simple_server import make_server
import math


class CalculService(ServiceBase):

    @rpc(Decimal, Decimal, Decimal, Decimal, _returns=Decimal)
    def calculer_temps_trajet(ctx, distance_km, vitesse_km_h, autonomie_km, temps_recharge_h):
        ctx.transport.resp_headers['Access-Control-Allow-Origin'] = '*'
        
        # Temps de trajet sans recharge
        temps_trajet = distance_km / vitesse_km_h  
        
        # Nombre de recharges nécessaires
        nb_recharges = int(math.ceil(distance_km / autonomie_km)) - 1
        
        # Temps total de recharge
        temps_recharge_total = nb_recharges * temps_recharge_h

        # Temps total de trajet avec recharges
        temps_trajet_total = temps_trajet + temps_recharge_total
        
        return temps_trajet_total


application = Application([CalculService], 'info.802.calcul.soap',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

wsgi_application = WsgiApplication(application)


if __name__ == '__main__':
    server = make_server('127.0.0.1', 8000, wsgi_application)
    server.serve_forever()