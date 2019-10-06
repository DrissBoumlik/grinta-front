import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../posts/post/post.service';
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
  posts : Post[];
  friends : User[];
  page = 1;

  constructor(private loginService: LoginService,
              private postService: PostService,
              private router: Router,
              private http: HttpClient,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    let userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;

    if(!userLogged)
      this.router.navigate(['/']);

    this.user = this.loginService.user;
    if (this.user === null || this.user === undefined) {
      this.user = JSON.parse(localStorage.getItem('_user')) as User;
    } else {
      localStorage.setItem('_user', JSON.stringify(this.user));
    }

    this.postService.postsUpdated.subscribe((posts) => {
      this.posts = posts;
    });
    this.postService.getPosts().subscribe((response: any) => {
      this.postService.posts = this.posts = response.posts;
      console.log(this.posts);
    });
  }
  scroll = true;
  gotAllPosts = false;
  onScroll() {
    if(this.scroll && !this.gotAllPosts) {
      this.scroll = false;
      this.page++;
      this.postService.getPosts(this.page).subscribe((response: any) => {
        /** spinner starts on init */
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 1 second = 1000ms */
          this.spinner.hide();
          if (!response.posts.length) {
            this.gotAllPosts = true;
          }
          this.posts.push(...response.posts);
          this.postService.posts = this.posts;
          console.log(this.posts);
          setTimeout(() => {
            this.scroll = true;
          }, 2000);
        }, 1000);
      });
    }
  }

}
