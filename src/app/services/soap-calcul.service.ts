import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SoapCalculService {

  private duration: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  duration$: Observable<number | null> = this.duration.asObservable();


  private uri = environment.soapURI;
  
  private options = { responseType: 'text' as 'json' };

  constructor(private http: HttpClient) { }

  calculDuration(distanceKm: number, vittesseKmH: number, nbRecharge: number, tempsRechargeH: number): Observable<any> {
    const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:spy="info.802.calcul.soap">\
      <soapenv:Header/>
      <soapenv:Body>
        <spy:calculer_temps_trajet>
          <spy:distance_km>${distanceKm}</spy:distance_km>
          <spy:vitesse_km_h>${vittesseKmH}</spy:vitesse_km_h>
          <spy:nb_recharge>${nbRecharge}</spy:nb_recharge>
          <spy:temps_recharge_h>${tempsRechargeH}</spy:temps_recharge_h>
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
