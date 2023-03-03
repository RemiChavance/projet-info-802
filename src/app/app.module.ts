import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './components/info/info.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { HoursPipe } from './pipes/hours.pipe';
import { GraphQLModule } from './graphql.module';
import { CarsComponent } from './components/cars/cars.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    MapComponent,
    HoursPipe,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
