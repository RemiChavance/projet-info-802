import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BorneService {

  private API_URI = environment.borneURI;


  constructor(private http: HttpClient) { }

  getBorne(lat: number, lon: number, radius: number): Observable<any[]> {
    const uri = this.API_URI + `geofilter.distance=${lat}%2C${lon}%2C${radius}`;

    return this.http.get<any>(uri).pipe(
      map(value => value.records[0])
    );
  }
}
