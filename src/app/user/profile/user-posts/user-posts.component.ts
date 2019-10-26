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
  profile: User;

  constructor(private userService: UserService,
              private postsService: PostsService,
              private profileService: ProfileService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
  }
}
