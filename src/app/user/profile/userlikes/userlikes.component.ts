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
  constructor(private profileService: ProfileService) {
    this.profile = this.profileService.profile;
  }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((user: User) => {
      this.profile = user;
      console.log(this.profile);
    });
  }

}
