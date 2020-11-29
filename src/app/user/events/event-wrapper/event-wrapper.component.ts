import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-event-wrapper',
  templateUrl: './event-wrapper.component.html',
  styleUrls: ['./event-wrapper.component.css']
})
export class EventWrapperComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Create Event');
  }

}
