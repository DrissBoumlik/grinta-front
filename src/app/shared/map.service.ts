import { Injectable } from '@angular/core';
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {Subject} from 'rxjs';

@Injectable()
export class MapService {

  provider = null;
  adresse: any;
  adresseChosen = new Subject();

  constructor() {
    this.provider = new OpenStreetMapProvider();
  }

  async getAddresses(searchTerm) {
    return await this.provider.search({query: searchTerm});
  }
}
