import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-event-options',
  templateUrl: './event-options.component.html',
  styleUrls: ['./event-options.component.css']
})
export class EventOptionsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Events options');
  }

}
