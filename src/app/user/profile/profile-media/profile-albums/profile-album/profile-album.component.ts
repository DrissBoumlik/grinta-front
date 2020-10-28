import { Component, OnInit } from '@angular/core';
import {User} from '../../../../user.model';
import {ProfileService} from '../../../profile.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Album} from '../../../../albums/album/album.model';

@Component({
  selector: 'app-profile-album',
  templateUrl: './profile-album.component.html',
  styleUrls: ['./profile-album.component.css']
})
export class ProfileAlbumComponent implements OnInit {
  profile: User;
  album: Album;
  emptyList = false;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.clear();
    let uuid = this.route.snapshot.params.username;
    this.route.params.subscribe((params: Params) => {
      uuid = params.uuid;
      this.onLoadProfile(uuid);
    });
    this.onLoadProfile(uuid);
  }

  onLoadProfile(uuid: string) {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.album = this.profile.albums.filter((album: Album) => {
        return uuid === album.uuid;
      })[0];
      this.emptyList = !this.album.medias.length;
      console.log(this.album);
    });
    this.profile = this.profileService.profile;
    this.album = this.profile.albums.filter((album: Album) => {
      return uuid === album.uuid;
    })[0];
    this.emptyList = !this.album.medias.length;
    console.log(this.album);
  }
}
