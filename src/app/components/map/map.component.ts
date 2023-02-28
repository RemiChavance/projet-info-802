import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import('leaflet-routing-machine');
import { Observable, tap, zip } from 'rxjs';
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
      minZoom: 1,
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
    
    zip(
      this.mapService.getGeoCoding(this.startCity),
      this.mapService.getGeoCoding(this.destCity)
    ).pipe(
      tap(value => {
        const start = value[0];
        const dest = value[1];

        const waypoint1 = new L.LatLng(start.lat, start.lon);
        const waypoint2 = new L.LatLng(dest.lat, dest.lon);

        this.traceRoute([waypoint1, waypoint2]);
      })
    ).subscribe();
  }


  private traceRoute(waypoints: L.LatLng[]) {
    const routing = L.Routing.control({
      waypoints: waypoints
    }).addTo(this.map);

    routing.on('routesfound', (e) => {
      const distance = e.routes[0].summary.totalDistance;
      console.log('routing distance: ' + distance + ' meters');
    });
  }
}

// to add a marker on the map :
// L.marker(waypoint1).addTo(this.map);