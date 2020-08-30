import {Component} from '@angular/core';
import * as jquery from 'jquery';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBERjm6nvJubSHoBkkmwBDAyfb1mCL55nM',
  databaseURL: 'https://grintaaa.firebaseio.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    firebase.initializeApp(config);
  }
}
