import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../../../tools.service';
import {Event} from '../../../../user/events/event.model';
import {EventService} from '../../../event.service';

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit {

  events: (Event | any)[] = [];
  loadMore = false;

  constructor(private eventService: EventService,
              private toolService: ToolsService) {
  }

  ngOnInit() {
    this.loadMore = true;
    const params = {limit: 3, period: -6};
    this.eventService.getLatestEvents(params).subscribe(
      (response: any) => {
        // this.events = response.data.map((event) => {
        //   event._date = this.toolService.timeDifference(new Date(), Date.parse(event.date));
        //   return event;
        // });
        this.events = response.data;
        this.loadMore = false;
      }
    );
  }

}
