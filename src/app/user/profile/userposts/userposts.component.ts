import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {LoginService} from '../../../login/login.service';
import {Router} from '@angular/router';
import {Post} from '../../posts/post/post.model';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserPostsComponent implements OnInit {
  user: User;
  posts: Post[] = [];

  constructor(private userService: UserService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.userService.profileLoaded.subscribe((user: User) => {
      this.user = user;
      this.userService.user.posts = this.posts;
    });
    this.user = JSON.parse(localStorage.getItem('_profile'));
    this.user = (this.user === undefined || this.user === null) ? this.userService.profile : this.user;
    this.loginService.isLogged(this.router);

    console.log(this.user);

    this.userService.postsUpdated.subscribe((posts) => {
      this.posts = posts;
    });
  }

}
