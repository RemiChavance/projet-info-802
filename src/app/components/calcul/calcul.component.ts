import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SoapCalculService } from 'src/app/services/soap-calcul.service';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.scss']
})
export class CalculComponent {

  distance!: number;
  vitesse!: number;
  autonomie!: number;
  recharge!: number;

  resultat!: number;

  constructor(private soapCalcul: SoapCalculService) { }

  onSubmitForm(form: NgForm) {
    console.log(form.value);

    const dist = form.value.distance;
    const vitt = form.value.vitesse;
    const auto = form.value.autonomie;
    const rech = form.value.recharge;

    this.soapCalcul.calculDuration(dist, vitt, auto, rech).pipe(
      map(value => this.resultat = value)
    ).subscribe();
  }

}