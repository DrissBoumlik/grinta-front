import {Component} from '@angular/core';
import * as jquery from 'jquery';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
