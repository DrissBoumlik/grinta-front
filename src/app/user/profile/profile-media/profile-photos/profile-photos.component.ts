import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {ProfileService} from '../../profile.service';
import {Album} from '../../../albums/album/album.model';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.css']
})
export class ProfilePhotosComponent implements OnInit {
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
    this.emptyList = !this.profile.photos.length;
  }

}
