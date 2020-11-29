import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../shared/event.service';
import {Event} from '../event.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-events-wrapper',
  templateUrl: './events-wrapper.component.html',
  styleUrls: ['./events-wrapper.component.css']
})
export class EventsWrapperComponent implements OnInit {
  events: Event[];
  queryPage: number;
  loadMore = false;
  scroll = true;

  constructor(private eventService: EventService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Events');
    // GET latest events page
    this.queryPage = 1;
    const params = {page: this.queryPage};
    this.getEvents(params);
  }

  getEvents(params) {
    this.loadMore = true;
    this.eventService.getEvents(params).subscribe(
      (response: any) => {
        if (this.queryPage === 1) {
          this.events = [];
        }
        this.events.push(...response.events);
        console.clear();
        this.scroll = !!response.events.length;
        console.log(this.scroll);
        // this.events = response.events;
        this.loadMore = false;
      }
    );
  }

  onLoadMore() {
    if (this.scroll) {
      const params = {page: ++this.queryPage};
      this.getEvents(params);
    }
  }
}
