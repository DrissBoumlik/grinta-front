import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import {PostsService} from './posts.service';
import {ProfileService} from '../profile/profile.service';
import {Page} from '../pages/page/page.model';
import {PageService} from '../pages/page/page.service';
import {Post} from './post/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  @Input() isProfile = false;
  @Input() isPage = false;
  @Input() page: Page | any;
  @Input() user: User | any;
  authUser: User | any;
  queryPage: number = 1;
  scroll = true;
  gotAllPosts = false;
  postsLoaded = false;
  loadMore = true;


  constructor(private authService: AuthService,
              private userService: UserService,
              private profileService: ProfileService,
              private postsService: PostsService,
              private pageService: PageService,
              private router: Router) {
  }

  ngOnInit() {
    // this.authService.isLogged(this.router);
    this.authUser = this.authService.user;
    this.user = JSON.parse(localStorage.getItem('profile') as string);
    this.page = JSON.parse(localStorage.getItem('page') as string);
    if (this.user) {
      this.initLoad(this.user);
      localStorage.removeItem('profile');
    } else if (this.page) {
      this.initLoad(this.page.user);
    } else {
      this.initLoad(this.authUser);
    }

    this.postsService.postsUpdated.subscribe((posts) => {
      this.user.posts = this.posts = posts;
    });

    // this.postsService.postsLoaded.subscribe((posts) => {
    //   this.user.posts = posts;
    // });
    this.profileService.profileLoaded.subscribe((user: User) => {
      localStorage.setItem('profile', JSON.stringify(user));
      this.initLoad(user);
      // console.log('++user');
      this.getPosts(this.user.id, 'user');
    });
    this.pageService.pageLoaded.subscribe((page: Page) => {
      localStorage.setItem('page', JSON.stringify(page));
      this.page = page;
      this.initLoad(page.user);
      // console.log('++page');
      this.getPosts(this.page.id, 'page');
    });
    if (!this.isProfile && !this.isPage) {
      // console.log('not profile - not page');
      this.getPosts();
    } else if (this.isPage) {
      // console.log('__page');
      const pageId = this.isPage ? this.page.id : null;
      this.getPosts(pageId, 'page');
    } else if (this.isProfile) {
      // console.log('__profile');
      const profileId = this.isProfile ? this.user.id : null;
      this.getPosts(profileId, 'user');
    } else if (this.profileService.alreadyLoaded) {
      // console.log('profile already loaded');
      const profileId = this.isProfile ? this.user.id : null;
      this.getPosts(profileId, 'user');
    }
  }

  initLoad(user: User) {
    this.user = user;
    this.user.posts = this.posts = [];
    this.queryPage = 1;
  }

  getPosts(id: any = null, type: any = null) {
    this.postsService.getPosts(this.queryPage++, id, type)
      .subscribe(
        (response: any) => {
          this.postsLoaded = true;
          this.user.posts = this.posts = this.postsService.posts;
          this.loadMore = false;
          if (!response.posts.length) {
            this.gotAllPosts = true;
          }
          this.scroll = true;
        },
        (error: any) => console.log(error)
      );
  }

  onLoadMorePosts() {
    if (this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.loadMore = true;
      if (!this.isProfile && !this.isPage) {
        // console.log('not profile - not page');
        this.getPosts();
      } else if (this.isPage) {
        const pageId = this.isPage ? this.page.id : null;
        this.getPosts(pageId, 'page');
      } else if (this.isProfile) {
        const profileId = this.isProfile ? this.user.id : null;
        this.getPosts(profileId, 'user');
      }
    }
  }

}
