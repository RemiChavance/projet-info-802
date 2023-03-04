import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private duration: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  duration$: Observable<number | null> = this.duration.asObservable();

  private distance: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  distance$: Observable<number | null> = this.distance.asObservable();

  private nbRecharge: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  nbRecharge$: Observable<number | null> = this.nbRecharge.asObservable();

  private autonomy: BehaviorSubject<number> = new BehaviorSubject<number>(500);
  autonomy$: Observable<number> = this.autonomy.asObservable();

  
  constructor() { }


  setDuration(duration: number) {
    this.duration.next(duration);
  }

  setDistance(distance: number) {
    this.distance.next(distance);
  }

  setNbRecharge(nbRecharge: number) {
    this.nbRecharge.next(nbRecharge);
  }

  setAutonomy(autonomy: number) {
    this.autonomy.next(autonomy);
  }
}
