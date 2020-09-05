import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {EventService} from '../event.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Marker} from 'leaflet';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  events: [];
  markers: Marker[] = [];
  Kilometers = 50;
  GetEvents = this.fb.group({
    Kilometers: new FormControl(),
  });
  storedPosition: any;

  constructor(private eventService: EventService,
              private fb: FormBuilder,
              private router: Router) {
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.storedPosition = localStorage.getItem('position');
    if (this.storedPosition) {
      this.storedPosition = JSON.parse(this.storedPosition);
      this.initMap(this.storedPosition);
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.storedPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            localStorage.setItem('position', JSON.stringify(this.storedPosition));
            this.initMap(this.storedPosition);
          }, (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  private initMap(position): void {
    this.map = L.map('map', {
      center: [position.latitude, position.longitude],
      zoom: 7
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    const location: any = [position.latitude, position.longitude];
    const user: User = JSON.parse(localStorage.getItem('my_profile'));
    // const location = event.location.split(',').map((str) => parseFloat(str));
    const marker = L.marker(location, {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [13, 37],
        iconUrl: user.picture,
        // event.user.picture, // '/assets/images/leaflet/marker-icon.png',
        // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
        className: 'map-icon-marker'
      })
    });
    marker.addTo(this.map);

    this.getNearEvents(this.Kilometers, position.latitude, position.longitude);
  }

  getNearEvents(kilometers, latitude, longitude) {
    this.eventService.getNearEvents(kilometers, latitude, longitude)
      .subscribe(
        (response: any) => {
          this.events = response.events;
          this.events.forEach((event: any) => {
            const location = event.location.split(',').map((str) => parseFloat(str));
            const marker = L.marker(location, {
              icon: L.icon({
                iconSize: [30, 30],
                iconAnchor: [13, 37],
                iconUrl: event.user.picture,
                // event.user.picture, // '/assets/images/leaflet/marker-icon.png',
                // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
                className: 'map-icon-marker'
              })
            }).on('click', (e) => {
              this.router.navigate(['/messenger/' + event.user.username]);
            });
            this.markers.push(marker);
            marker.addTo(this.map);
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onGetEvents() {
    this.markers.forEach((marker: Marker) => {
      marker.removeFrom(this.map);
    });
    this.markers = [];
    this.Kilometers = this.GetEvents.value.Kilometers;
    if (this.storedPosition) {
      this.getNearEvents(this.Kilometers, this.storedPosition.latitude, this.storedPosition.longitude);
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.storedPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
          localStorage.setItem('position', JSON.stringify(this.storedPosition));
          this.getNearEvents(this.Kilometers, this.storedPosition.latitude, this.storedPosition.longitude);
        }, (error) => {
          console.log(error);
        }
      );
    }
  }
}
