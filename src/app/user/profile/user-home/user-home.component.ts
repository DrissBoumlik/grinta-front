import { Component, OnInit } from '@angular/core';
import {Params} from '@angular/router';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {Media} from '../../albums/album/medias/media/media.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  profile: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
