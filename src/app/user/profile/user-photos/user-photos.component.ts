import { Component, OnInit } from '@angular/core';
import {User} from "../../user.model";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css']
})
export class UserPhotosComponent implements OnInit {
  profile: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      console.log(this.profile);
    });
    this.profile = this.profileService.profile;
    console.log(this.profile);
  }

}
