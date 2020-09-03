import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {EventService} from '../event.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  events: [];

  constructor(private eventService: EventService,
              private router: Router) {
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [48.8494709, 2.3468044],
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    }

    this.eventService.getEvents().subscribe(
      (response: any) => {
        console.log(response);
        this.events = response.events;
        this.events.forEach((event: any) => {
          const location = event.location.split(',');
          const items = [1, 2, 3, 4];
          let index = Math.floor(Math.random() * items.length);
          if (index >= items.length) {
            index = items.length - 1;
          }
          L.marker(location, {
            icon: L.icon({
              iconSize: [30, 30],
              iconAnchor: [13, 37],
              iconUrl: '/assets/images/leaflet/me-marker-' + items[index] + '.jpg',
              // event.user.picture, // '/assets/images/leaflet/marker-icon.png',
              // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
              className: 'map-icon-marker'
            })
          }).on('click', (e) => {
            console.log(e);
            console.log(event.user.username);
            this.router.navigate(['/messenger/' + event.user.username]);
          }).addTo(this.map);
        });
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
