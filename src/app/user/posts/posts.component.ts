import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../../Auth/auth.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {PostsService} from './posts.service';
import {ProfileService} from '../profile/profile.service';
import {Page} from '../pages/page/page.model';
import {PageService} from '../pages/page/page.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() isProfile = false;
  @Input() isPage = false;
  @Input() page: Page;
  user: User;
  authUser: User;
  queryPage = 1;
  scroll = true;
  gotAllPosts = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private profileService: ProfileService,
              private postsService: PostsService,
              private pageService: PageService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.authService.isLogged(this.router);
    this.user = this.authUser = this.authService.user;
    this.user.posts = [];
    this.profileService.profileLoaded.subscribe((profile: User) => {
        this.user = profile;
        this.user.posts = [];
        this.queryPage = 1;
        this.getPosts('profile loaded');
      });
    this.postsService.postsUpdated.subscribe((posts) => {
      this.user.posts = posts;
    });
    this.pageService.pageLoaded.subscribe((page: Page) => {
      this.page = page;
      this.user = page.user;
      this.user.posts = [];
      this.getPosts('page loaded');
    });
    if (!this.isProfile && !this.isPage) {
      this.getPosts('not profile');
    }
  }

  getPosts(message) {
    console.log(message);
    const profileId = this.isProfile ? this.user.id : null;
    const pageId = this.isPage ? this.page.id : null;
    this.postsService.getPosts(this.queryPage++, profileId, pageId)
      .subscribe((response: any) => {
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

  onLoadMorePosts() {
    if (this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.getPosts('on scroll');
      this.scroll = true;
    }
  }

}
