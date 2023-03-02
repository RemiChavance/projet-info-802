import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrls: ['./calcul.component.scss']
})
export class CalculComponent implements OnInit {

  autonomie!: number;
  recharge!: number;

  duration$!: Observable<number | null>;
  distance$!: Observable<number | null>;
  nbRecharge$!: Observable<number | null>;


  constructor(private infoService: InfoService) { }


  ngOnInit(): void {
    this.duration$ = this.infoService.duration$;
    this.distance$ = this.infoService.distance$;
    this.nbRecharge$ = this.infoService.nbRecharge$;
  }

  onSubmitForm(form: NgForm) {
    //console.log(form.value);
  }

}