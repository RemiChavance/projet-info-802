import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private API_URI = 'https://nominatim.openstreetmap.org';


  private startCities: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  startCities$: Observable<string[]> = this.startCities.asObservable();

  private destCities: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  destCities$: Observable<string[]> = this.startCities.asObservable();


  constructor(private http: HttpClient) { }

  getGeoCoding(cityName: string): Observable<{ lat: number, lon: number }> {
    const uri = `${this.API_URI}/search?q=${cityName}&format=json`;

    return this.http.get<any>(uri).pipe(
      map(value => {
        return  { lat: value[0].lat, lon: value[0].lon };
      })
    );
  }

  getCities(cityName: string): Observable<string[]> {
    const uri = `${this.API_URI}/search?q=${cityName}&format=json`;

    return this.http.get<any>(uri).pipe(
      map(value => {
        let cities: string[] = [];

        value.forEach((city: any) => {
          cities.push(city.display_name);
        });

        return cities;
      })
    );
  }


  getStartCitiesSuggestions(cityName: string) {
    this.getCities(cityName).pipe(
      tap(value => this.startCities.next(value))
    ).subscribe();
  }

  getDestCitiesSuggestions(cityName: string) {
    this.getCities(cityName).pipe(
      tap(value => this.destCities.next(value))
    ).subscribe();
  } 
  
}
