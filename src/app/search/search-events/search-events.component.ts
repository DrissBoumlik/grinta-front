import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {EventService} from '../../shared/event.service';
import {Event} from '../../user/events/event.model';
import {SearchService} from '../../shared/search.service';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.css']
})
export class SearchEventsComponent implements OnInit {

  events: Event[];
  queryPage: number;
  loadMore = false;
  scroll = true;

  constructor(private eventService: EventService,
              private searchService: SearchService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Search Events');
    this.queryPage = 1;
    const params = {page: this.queryPage, searchTerm: this.searchService.searchTerm};
    this.getEvents(params);
  }

  getEvents(params: any) {
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
