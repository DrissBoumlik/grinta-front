import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {Event} from '../../events/event.model';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  profile: User;
  events: Event[] = [];
  type = 'events';
  emptyList = false;
  urls = {
    events: () => {
      this.events = this.profile.events;
      this.emptyList = !this.events.length;
    },
    eventInvitations: () => {
      this.events = this.profile.eventInvitations;
      this.emptyList = !this.events.length;
    }
  };
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.events = [];
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.urls[this.type]();
    });
    this.profile = this.profileService.profile;
    this.urls[this.type]();
  }

  getEvents(type: string) {
    this.events = [];
    this.type = type;
    this.urls[type]();
  }

}
