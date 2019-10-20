import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {LoginService} from '../../../login/login.service';
import {Router} from '@angular/router';
import {Post} from '../../posts/post/post.model';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserPostsComponent implements OnInit {
  user: User;
  posts: Post[] = [];

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((user: User) => {
      this.user = user;
      this.profileService.profile.posts = this.posts;
      console.log(this.user);
    });
    // this.user = JSON.parse(localStorage.getItem('_profile'));
    // this.user = (this.user === undefined || this.user === null) ? this.profileService.profile : this.user;

    this.loginService.isLogged(this.router);

    this.userService.postsUpdated.subscribe((posts) => {
      this.posts = posts;
    });
  }

}
