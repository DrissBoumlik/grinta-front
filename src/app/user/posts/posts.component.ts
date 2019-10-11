import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { LoginService } from '../../login/login.service';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from '../user.model';
import { Post } from '../posts/post/post.model';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  user: User;
  posts : Post[] = [];
  friends : User[];
  page = 1;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginService.isLogged(this.router);

    this.user = this.loginService.user;

    this.userService.postsUpdated.subscribe((posts) => {
      this.posts = posts;
    });

    this.getPosts();
  }

  getPosts() {
    this.userService.getPosts(this.page).subscribe((response: any) => {
      /** spinner starts on init */
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 1 second = 1000ms */
        this.spinner.hide();
        this.posts.push(...response.posts);
        this.userService.posts = this.posts;
      }, 1000);

      if (!response.posts.length) {
        this.gotAllPosts = true;
      }
    });
  }

  scroll = true;
  gotAllPosts = false;
  onScroll() {
    if(this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.page++;
      this.getPosts();
      this.scroll = true;
    }
  }

}
