import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalculComponent } from './components/calcul/calcul.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { HoursPipe } from './pipes/hours.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalculComponent,
    MapComponent,
    HoursPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
