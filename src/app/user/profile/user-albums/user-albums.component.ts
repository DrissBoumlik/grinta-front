import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../Auth/auth.service';
import {Router} from '@angular/router';
import {Album} from '../../albums/album/album.model';

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.css']
})
export class UserAlbumsComponent implements OnInit {
  profile: User;
  cover = undefined;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.profile.albums.forEach((album) => {
        let _album = new Album(album.id, album.user_id,
          album.name, album.description, album.user,
          album.medias, album.created_at, null);
        _album.getThumnail();
        album.thumbnail = _album.thumbnail;
      });
      // const album = new Album(this.profile.albums[0].id, this.profile.albums[0].user_id,
      //   this.profile.albums[0].name, this.profile.albums[0].description, this.profile.albums[0].user,
      //   this.profile.albums[0].medias, this.profile.albums[0].created_at);
      // this.cover = album.getThumnail();
    });
    this.profile = this.profileService.profile;
  }

}
