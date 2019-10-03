import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../posts/post/post.service';
import { LoginService } from '../../login/login.service';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from '../user.model';
import { Post } from '../posts/post/post.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  user: User;
  posts : Post[];
  friends : User[];

  constructor(private loginService: LoginService,
              private postService: PostService,
              private router: Router,
              private http: HttpClient) { }

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
    this.postService.getPosts(1).subscribe((response: any) => {
      this.posts = response.posts;
      this.postService.posts = response.posts;
    });
  }

}
