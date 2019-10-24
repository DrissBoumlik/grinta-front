import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile.service';
import {User} from '../../user.model';

@Component({
  selector: 'app-userlikes',
  templateUrl: './userlikes.component.html',
  styleUrls: ['./userlikes.component.css']
})
export class UserLikesComponent implements OnInit {
  profile: User;
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
