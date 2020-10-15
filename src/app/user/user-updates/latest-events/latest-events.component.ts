import { Component, OnInit } from '@angular/core';
import {ToolsService} from '../../../shared/tools.service';
import {Event} from '../../events/event.model';
import {EventService} from '../../../shared/event.service';

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit {

  events: (Event | any)[] = [];
  constructor(private eventService: EventService,
              private toolService: ToolsService) { }

  ngOnInit() {
    const params = {limit: 3, period: -6};
    this.eventService.getLatestEvents(params).subscribe(
      (response: any) => {
        this.events = response.data.map((event) => {
          event._date = this.toolService.timeDifference(new Date(), Date.parse(event.date));
          return event;
        });
      }
    );
  }

}
