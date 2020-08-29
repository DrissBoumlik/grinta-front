import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  positions = [];
  constructor() {}

  ngOnInit() {
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array
    debugger
  }
  onIdle(event) {
    console.log('map', event.target);
    debugger
  }
  onMarkerInit(marker) {
    console.log('marker', marker);
    debugger
  }
  onMapClick(event) {
    debugger
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
  }
}
