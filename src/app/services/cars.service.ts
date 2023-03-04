import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private carsSearch: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  carsSearch$: Observable<any[]> = this.carsSearch.asObservable();
  
 
  constructor(
    private apollo: Apollo,
    private infoService: InfoService
  ) { }
 

  findCarInfo(id: number) {
    this.apollo.watchQuery({
      query: gql`
        query vehicle {
          vehicle(id: "${id}") {
            id
            range {
              chargetrip_range {
                best
                worst
              }
            }
          }
        }
        `,
    }).valueChanges.pipe(
      map((value: any) => {
        const best = value.data.vehicle.range.chargetrip_range.best;
        const worst = value.data.vehicle.range.chargetrip_range.worst;
        return (best + worst) / 2;
      }),
      tap(value => this.infoService.setAutonomy(value))
    ).subscribe();
  }


  searchCars(car: string) {
    this.apollo.watchQuery({
      query: gql`
        query vehicleListAll {
          vehicleList(size: 3, search: "${car}") {
            id
            naming {
              model
            }
          }
        }
        `,
    }).valueChanges.pipe(
      map((value: any) => {
        const data = value.data.vehicleList;
        const cars: any[] = [];
        
        data.forEach((car: any) => {
          cars.push({ model: car.naming.model, id: car.id })
        });
        
        return cars;
      }),
      tap(value => this.carsSearch.next(value))
    ).subscribe();
  }

}