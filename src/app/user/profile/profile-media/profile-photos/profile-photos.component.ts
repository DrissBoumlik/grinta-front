import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {ProfileService} from '../../profile.service';
import {AuthService} from '../../../../auth/auth.service';
import {Album} from '../../../albums/album/album.model';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.css']
})
export class ProfilePhotosComponent implements OnInit {
  authUser: User | any;
  profile: User | any;
  ownProfile: boolean = true;
  emptyList = false;
  constructor(private profileService: ProfileService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.init();
    });
    this.profile = this.profileService.profile;
    this.init();
  }

  init() {
    this.ownProfile = this.authUser.uuid === this.profile.uuid;
    this.emptyList = !this.profile.photos.length;
  }

}
