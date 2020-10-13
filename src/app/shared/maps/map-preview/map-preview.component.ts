import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-preview',
  templateUrl: './map-preview.component.html',
  styleUrls: ['./map-preview.component.css']
})
export class MapPreviewComponent implements OnInit, AfterViewInit {

  private map;
  provider = null;
  @Input() position;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap(this.position);
  }

  private initMap(position): void {
    const zoomValue = 10;
    this.map = L.map('map', {
      center: [position.latitude, position.longitude],
      zoom: zoomValue,
      // dragging: false,
      // zoomControl: false,
      // boxZoom: false,
      // minZoom: zoomValue,
      // maxZoom: zoomValue,
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    const location: any = [position.latitude, position.longitude];
    // const location = event.location.split(',').map((str) => parseFloat(str));
    const marker = L.marker(location, {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 37],
        iconUrl: '/assets/images/leaflet/marker-icon.png',
        // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
        className: 'event-marker'
      })
    });
    marker.addTo(this.map);
  }

}
