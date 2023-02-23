import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoapCalculService {

  private uri = 'http://localhost:8000';
  private options = { responseType: 'text' as 'json' };

  constructor(private http: HttpClient) { }

  calculDuration(dist: number, vitt: number, auto: number, rech: number): Observable<any> {
    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:spy="info.802.calcul.soap">\
      <soapenv:Header/>
      <soapenv:Body>
        <spy:calculer_temps_trajet>
          <spy:distance_km>${dist}</spy:distance_km>
          <spy:vitesse_km_h>${vitt}</spy:vitesse_km_h>
          <spy:autonomie_km>${auto}</spy:autonomie_km>
          <spy:temps_recharge_h>${rech}</spy:temps_recharge_h>
        </spy:calculer_temps_trajet>
      </soapenv:Body>
    </soapenv:Envelope>`;
    return this.http.post<any>(this.uri, body, this.options).pipe(
      map(value => {
        const data = value.split("calculer_temps_trajetResult");
        let res = data[1];
        res = res.replace(">","");
        res = res.replace("</tns:","");
        return res;
      })
    );
  }
}
