import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  readonly environment = environment;
  ngOnInit() {
  }

}
