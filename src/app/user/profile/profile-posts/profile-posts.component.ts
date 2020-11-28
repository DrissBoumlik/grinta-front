import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostsService} from '../../posts/posts.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
  user: User;
  authUser: User;
  ownProfile = false;
  justLoaded = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private postsService: PostsService,
              private profileService: ProfileService) { }

  ngOnInit() {
    // if (this.profileService.profile) {
    //   this.profile = this.profileService.profile;
    //   this.justLoaded = true;
    //   this.postsService.getPosts(1, this.profile.id, 'user');
    // }
    this.authUser = this.authService.user;

    this.profileService.profileLoaded.subscribe((user: User) => {
      this.user = user;
      this.justLoaded = true;
      this.ownProfile = this.authUser.uuid === this.user.uuid;
      // this.postsService.getPosts(1, this.profile.id, 'user');
    });
  }
}
