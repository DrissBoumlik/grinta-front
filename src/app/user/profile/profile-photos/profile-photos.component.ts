import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {Album} from '../../albums/album/album.model';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.css']
})
export class ProfilePhotosComponent implements OnInit {
  profile: User;
  albums: (Album | any)[];
  emptyList = false;
  emptyAlbums = false;
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
    this.emptyAlbums = !this.profile.albums.length;
    this.albums = this.profile.albums.filter((album) => {
      return album.medias.length;
    });
    this.albums = this.albums.map((album: Album | any) => {
      let coverAlbum = '/assets/images/default/album-cover.jpg';
      for (const media of album.medias) {
        if (media.type === 'image') {
          coverAlbum = media.media_url;
        }
      }
      album.cover = coverAlbum;
      return album;
    });
  }

}
