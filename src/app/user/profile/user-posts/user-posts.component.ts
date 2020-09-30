import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {ProfileService} from '../profile.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PostsService} from '../../posts/posts.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  user: User;
  justLoaded = false;

  constructor(private userService: UserService,
              private postsService: PostsService,
              private profileService: ProfileService) { }

  ngOnInit() {
    // if (this.profileService.profile) {
    //   this.profile = this.profileService.profile;
    //   this.justLoaded = true;
    //   this.postsService.getPosts(1, this.profile.id, 'user');
    // }

    this.profileService.profileLoaded.subscribe((user: User) => {
      this.user = user;
      this.justLoaded = true;
      // this.postsService.getPosts(1, this.profile.id, 'user');
    });
  }
}
