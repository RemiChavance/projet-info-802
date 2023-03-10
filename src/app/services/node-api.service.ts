import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class NodeApiService {

  private uri = environment.restURI;
  
  constructor(
    private http: HttpClient,
    private infoService: InfoService  
  ) { }


  getCost(distanceKm: number) {
    this.http.get<any>(this.uri + '/' + distanceKm).pipe(
      map(value => value.price),
      tap(value => this.infoService.setCost(value))
    ).subscribe();
  }
}
