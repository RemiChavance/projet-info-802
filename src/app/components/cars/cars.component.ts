import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  car!: string;
  carsSuggestions$!: Observable<any[]>;
  carsSuggestions: any[] = [];

  constructor(private carsService: CarsService) { }


  ngOnInit(): void {
    this.carsSuggestions$ = this.carsService.carsSearch$.pipe(
      tap(value => {
        this.carsSuggestions = [];
        this.carsSuggestions = value;
      })
    );
  }

  onSubmitForm() {
    if (this.carsSuggestions.length == 0 || this.car.length == 0) {
      return;
    } 

    const carObj = this.carsSuggestions.find(x => x.model == this.car);
    if (carObj == null) return;

    this.carsService.findCarInfo(carObj.id);
  }

  onChangeCarSearch() {
    if (this.car.length > 3) {
      this.carsService.searchCars(this.car);
    }
  }
}
