import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../auth/auth.service';
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
      this.assignCovers();
    });
    this.profile = this.profileService.profile;
    this.assignCovers();
  }

  assignCovers() {
    if (this.profile) {
      this.profile.albums.forEach((album) => {
        const _album = new Album(album.id, album.user_id,
          album.name, album.description, album.user,
          album.medias, album.created_at, null);
        _album.getThumnail();
        album.thumbnail = _album.thumbnail;
      });
    }
  }

}
