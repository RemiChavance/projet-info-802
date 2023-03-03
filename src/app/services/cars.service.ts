import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private carsSearch: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  carsSearch$: Observable<any[]> = this.carsSearch.asObservable();

 
  constructor(private apollo: Apollo) { }
 
  
  findCarInfo(id: number) {
    this.apollo.watchQuery({
      query: gql`
        query vehicle {
          vehicle(id: "${id}") {
            id
            naming {
              make
              model
            }
            battery {
              usable_kwh
              full_kwh
            }
          }
        }
        `,
    }).valueChanges.pipe(
      map((value: any) => value.data.vehicle.battery), //.usable_kwh
      tap(value => console.log(value))
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