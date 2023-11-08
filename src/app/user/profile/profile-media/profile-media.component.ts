import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-profile-media',
  templateUrl: './profile-media.component.html',
  styleUrls: ['./profile-media.component.css']
})
export class ProfileMediaComponent implements OnInit {
  profile: User | any;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
