import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventService} from '../../../shared/event.service';
import {User} from '../../user.model';
import {Event} from '../event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  user: User;
  event: Event;

  constructor(private route: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit() {
    let uuid = this.route.snapshot.params.uuid;
    this.onGetEvent(uuid);
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      uuid = params.uuid;
      this.onGetEvent(uuid);
    });
  }

  onGetEvent(uuid: string) {
    this.eventService.getEventByUuid(uuid).subscribe((response: any) => {
      this.event = response.event;
      this.user = response.event.user;
    });
  }

}
