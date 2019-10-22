import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../../Auth/auth.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {PostsService} from './posts.service';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() isProfile = false;
  user: User;
  page = 1;
  scroll = true;
  gotAllPosts = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private profileService: ProfileService,
              private postsService: PostsService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.authService.isLogged(this.router);
    this.user = this.authService.user;
    this.user.posts = [];
    this.profileService.profileLoaded.subscribe((profile: User) => {
        this.user = profile;
        this.user.posts = [];
        this.page = 1;
        this.getPosts('profile loaded');
      });
    this.postsService.postsUpdated.subscribe((posts) => {
      this.user.posts = posts;
    });
    if (!this.isProfile) {
      this.getPosts('not profile');
    }
  }

  getPosts(message) {
    console.log(message, this.page);
    this.postsService.getPosts(this.page++, (this.isProfile ? this.user.id : null)).subscribe((response: any) => {
      this.user.posts.push(...response.posts);
      // /** spinner starts on init */
      // this.spinner.show();
      // setTimeout(() => {
      //   /** spinner ends after 1 second = 1000ms */
      //   this.spinner.hide();
      // }, 1000);

      if (!response.posts.length) {
        this.gotAllPosts = true;
      }
    });
  }

  onScroll() {
    if (this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.getPosts('on scroll');
      this.scroll = true;
    }
  }

}
