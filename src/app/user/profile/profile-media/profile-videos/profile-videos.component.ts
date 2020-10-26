import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {ProfileService} from '../../profile.service';

@Component({
  selector: 'app-profile-videos',
  templateUrl: './profile-videos.component.html',
  styleUrls: ['./profile-videos.component.css']
})
export class ProfileVideosComponent implements OnInit {
  profile: User;
  emptyList = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.init();
    });
    this.profile = this.profileService.profile;
    this.init();
  }

  init() {
    this.emptyList = !this.profile.videos.length;
  }

}
