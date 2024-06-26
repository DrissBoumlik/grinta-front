import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  profile: User | any;
  noEvents = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.noEvents = this.profile.events.length === 0 && this.profile.eventInvitations.length === 0;
    });
    this.profile = this.profileService.profile;
    if (this.profile) {
      this.noEvents = this.profile.events.length === 0 && this.profile.eventInvitations.length === 0;
    }
  }

}
