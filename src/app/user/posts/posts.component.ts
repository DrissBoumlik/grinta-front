import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../../Auth/auth.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import {NgxSpinnerService} from 'ngx-spinner';
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
  @Input() user: User;
  authUser: User;
  queryPage: number;
  scroll = true;
  gotAllPosts = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private profileService: ProfileService,
              private postsService: PostsService,
              private pageService: PageService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.authService.isLogged(this.router);
    this.authUser = this.authService.user;
    this.initLoad(this.authUser);

    this.postsService.postsUpdated.subscribe((posts) => {
      this.user.posts = posts;
    });
    this.pageService.pageLoaded.subscribe((page: Page) => {
      this.page = page;
      this.initLoad(page.user);
      this.getPosts('page loaded');
    });
    if (!this.isProfile && !this.isPage) {
      console.log('not profile - not page');
      this.getPosts();
    } else if (this.isPage) {
      const pageId = this.isPage ? this.page.id : null;
      this.getPosts(pageId, 'page');
    } else if (this.isProfile) {
      const profileId = this.isProfile ? this.user.id : null;
      this.getPosts(profileId, 'user');
    }

    if (this.profileService.alreadyLoaded) {
      console.log('profile already loaded');
      this.getPosts();
    }
  }

  initLoad(user: User) {
    this.user = user;
    this.user.posts = [];
    this.queryPage = 1;
  }

  getPosts(id = null, type = null) {
    this.postsService.getPosts(this.queryPage++, id, type)
      .subscribe(
        (response: any) => {
          this.user.posts = this.postsService.user.posts;
          this.spinner.hide();
          if (!response.posts.length) {
            this.gotAllPosts = true;
          }
        },
        (error: any) => console.log(error)
      );
  }

  onLoadMorePosts() {
    if (this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.spinner.show();
      console.log('on scroll');
      if (!this.isProfile && !this.isPage) {
        console.log('not profile - not page');
        this.getPosts();
      } else if (this.isPage) {
        const pageId = this.isPage ? this.page.id : null;
        this.getPosts(pageId, 'page');
      } else if (this.isProfile) {
        const profileId = this.isProfile ? this.user.id : null;
        this.getPosts(profileId, 'user');
      }
      this.scroll = true;
    }
  }

}
