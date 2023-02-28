import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable, tap } from 'rxjs';
import { MapService } from 'src/app/services/map.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  startCity!: string;
  destCity!: string;

  startCities$!: Observable<string[]>;
  destCities$!: Observable<string[]>;

  private map!: any;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.initMap();

    this.startCities$ = this.mapService.startCities$;
    this.destCities$ = this.mapService.destCities$;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.564601, 5.917781 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  onChangeStartSearch() {
    //this.mapService.getStartCitiesSuggestions(this.startCity);
  }

  onChangeDestSearch() {
    //this.mapService.getDestCitiesSuggestions(this.destCity);
  }


  onSubmitForm() {
    this.mapService.getGeoCoding(this.startCity).pipe(
      tap(value => {
        this.map.setView(new L.LatLng(value.lat, value.lon), 7, { animation: true });
        L.marker(new L.LatLng(value.lat, value.lon)).addTo(this.map);
      })
    ).subscribe();
  }

}
