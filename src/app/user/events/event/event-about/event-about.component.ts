import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../../shared/event.service';
import {Event} from '../../event.model';

@Component({
  selector: 'app-event-about',
  templateUrl: './event-about.component.html',
  styleUrls: ['./event-about.component.css']
})
export class EventAboutComponent implements OnInit {

  event: Event;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.event = event;
    });
    this.event = this.eventService.event;
  }

}
