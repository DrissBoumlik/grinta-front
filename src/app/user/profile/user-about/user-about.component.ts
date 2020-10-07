import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent implements OnInit {

  profile: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
