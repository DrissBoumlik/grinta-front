import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {UserService} from '../../../user.service';
import {ProfileService} from '../../profile.service';
import {AuthService} from '../../../../auth/auth.service';
import {Router} from '@angular/router';
import {Album} from '../../../albums/album/album.model';

@Component({
  selector: 'app-profile-albums',
  templateUrl: './profile-albums.component.html',
  styleUrls: ['./profile-albums.component.css']
})
export class ProfileAlbumsComponent implements OnInit {
  authUser: User;
  profile: User;
  ownProfile: boolean;
  albums: (Album | any)[];
  emptyAlbums = false;

  constructor(private profileService: ProfileService,
              private authService: AuthService) {}

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
    this.emptyAlbums = !this.profile.albums.length;
    this.albums = this.profile.albums.filter((album) => {
      return album.medias.length;
    });
    this.albums = this.albums.map((album: Album | any) => {
      let coverAlbum = '/assets/images/default/album-cover.jpg';
      for (const media of album.medias) {
        if (media.type === 'image') {
          coverAlbum = media.media_url;
          break;
        }
      }
      album.cover = coverAlbum;
      return album;
    });
  }

}
