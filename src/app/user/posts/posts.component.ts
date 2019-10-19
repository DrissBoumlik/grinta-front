import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from '../../login/login.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() profile: User = null;
  user: User;
  // posts: Post[] = [];
  friends: User[];
  page = 1;
  scroll = true;
  gotAllPosts = false;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private profileService: ProfileService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginService.isLogged(this.router);

    this.user = this.profile ? this.profile : this.loginService.user;
    this.user.posts = [];
    if (this.profile) {
      this.profileService.profile = this.user;
    } else {
      this.userService.user = this.user;
    }
    this.userService.postsUpdated.subscribe((posts) => {
      this.user.posts = posts;
    });
    this.getPosts();
  }

  getPosts() {
    console.log(this.profile);
    this.userService.getPosts(this.page, this.profile ? this.profile.id : null).subscribe((response: any) => {
      /** spinner starts on init */
      this.spinner.show();
      this.user.posts.push(...response.posts);
      setTimeout(() => {
        /** spinner ends after 1 second = 1000ms */
        this.spinner.hide();
        if (this.profile) {
          this.profileService.profile.posts = this.user.posts;
        } else {
          this.userService.user.posts = this.user.posts;
        }
      }, 1000);

      if (!response.posts.length) {
        this.gotAllPosts = true;
      }
    });
  }

  onScroll() {
    if (this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.page++;
      this.getPosts();
      this.scroll = true;
    }
  }

}
