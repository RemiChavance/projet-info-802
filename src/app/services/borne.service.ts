import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, repeat, retry, retryWhen, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorneService {

  private API_URI = 'https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&';


  constructor(private http: HttpClient) { }

  getBorne(lat: number, lon: number, radius: number): Observable<any[]> {
    const uri = this.API_URI + `geofilter.distance=${lat}%2C${lon}%2C${radius}`;

    return this.http.get<any>(uri).pipe(
      map(value => value.records[0])
    );
  }
}
