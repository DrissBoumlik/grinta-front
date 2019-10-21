import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../../Auth/auth.service';
import {Router} from '@angular/router';

import {User} from '../user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() user: User;
  page = 1;
  scroll = true;
  gotAllPosts = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.authService.isLogged(this.router);
    this.user = this.userService.user;
    this.user.posts = [];
    this.userService.postsUpdated.subscribe((posts) => {
      this.user.posts = posts;
    });

    this.getPosts();
  }

  getPosts() {
    this.userService.getPosts(this.page).subscribe((response: any) => {
      /** spinner starts on init */
      this.spinner.show();
      this.user.posts.push(...response.posts);
      setTimeout(() => {
        /** spinner ends after 1 second = 1000ms */
        this.spinner.hide();
      }, 1000);
      this.userService.user.posts = this.user.posts;

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
