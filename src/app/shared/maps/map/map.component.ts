import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {EventService} from '../../event.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {LatLngExpression, Marker, Point} from 'leaflet';
import {User} from '../../../user/user.model';
import {Event} from '../../../user/events/event.model';
import {AuthService} from '../../../auth/auth.service';

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
  GetEventsForm = this.fb.group({
    Kilometers: new FormControl(),
  });
  storedPosition: any;
  GetAddresses = this.fb.group({
    searchTerm: new FormControl(),
  });
  provider = null;
  results = [];
  user: User;
  event: Event;
  showResults = false;

  constructor(private eventService: EventService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }


  ngOnInit() {
    this.user = this.authService.user;
    // setup
    this.provider = new OpenStreetMapProvider();
  }

  ngAfterViewInit(): void {
    this.storedPosition = localStorage.getItem('position');
    if (this.storedPosition) {
      this.storedPosition = JSON.parse(this.storedPosition);
      this.initMap(this.storedPosition);
    } else {
      try {
        this.getCurrentPosition((position) => {
          this.storedPosition = position;
          localStorage.setItem('position', JSON.stringify(this.storedPosition));
          this.initMap(this.storedPosition);
        }, null);
      } catch (e) {
        const location = this.user.location.split(',');
        this.storedPosition = { latitude: location[0], longitude: location[1] };
        localStorage.setItem('position', JSON.stringify(this.storedPosition));
        this.initMap(this.storedPosition);
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
    // this.user = JSON.parse(localStorage.getItem('authUser'));
    // const location = event.location.split(',').map((str) => parseFloat(str));
    const marker = L.marker(location, {
      icon: L.icon({
        iconSize: [40, 40],
        iconAnchor: [13, 37],
        iconUrl: this.user.picture,
        // event.user.picture, // '/assets/images/leaflet/marker-icon.png',
        // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
        className: 'map-icon-marker'
      })
    });
    marker.addTo(this.map);

    this.getNearEvents(this.Kilometers, position);
  }

  getCurrentPosition(resolve, reject = null) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (resolve) {
            const currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            resolve(currentPosition);
          }
        }, (error) => {
          console.log(error);
        }, {enableHighAccuracy: true, maximumAge: 0, timeout: 10000}
      );
    }
  }

  getNearEvents(kilometers, position) {
    this.eventService.getNearEvents(kilometers, position)
      .subscribe(
        (response: any) => {
          this.events = response.events;
          const iconSize = new Point(40, 40);
          if (this.events.length > 10) {
            iconSize.x = 35;
            iconSize.y = 35;
          }
          this.events.forEach((event: any) => {
            const location = event.location.split(',').map((str) => parseFloat(str));
            const marker = L.marker(location, {
              icon: L.icon({
                iconSize,
                iconAnchor: [13, 37],
                iconUrl: event.user.picture,
                // event.user.picture, // '/assets/images/leaflet/marker-icon.png',
                // shadowUrl: '/assets/images/leaflet/marker-shadow.png'
                className: 'map-icon-marker'
              })
            }).on('click', (e) => {
              this.router.navigate(['/' + event.user.username]);
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
    this.Kilometers = this.GetEventsForm.value.Kilometers;
    if (this.storedPosition) {
      this.getNearEvents(this.Kilometers, this.storedPosition);
    } else {
      this.getCurrentPosition((position) => {
        this.storedPosition = position;
        localStorage.setItem('position', JSON.stringify(this.storedPosition));
        this.getNearEvents(this.Kilometers, this.storedPosition);
      }, null);
    }
  }

  onGetAddresses() {
    // search
    this.getAddresses().then((results) => {
      this.results = results;
      this.showResults = this.results.length > 0;
    });
  }
  async getAddresses() {
    return await this.provider.search({query: this.GetAddresses.value.searchTerm});
  }

  onAddMarker(positionData) {
    console.log('marked');
    this.showResults = false;
    const location: LatLngExpression = [positionData.y, positionData.x];
    const marker = L.marker(location, {
      icon: L.icon({
        iconSize: [40, 40],
        iconAnchor: [13, 37],
        iconUrl: this.user.picture,
        className: 'map-icon-marker'
      })
    });
    marker.addTo(this.map);
  }
}
