import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from './post/post.service';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from './user.model';
import { Post } from './post/post.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  posts : Post[];
  friends : User[];
  sharePostForm = new FormGroup({
    'content': new FormControl(null),
    'image': new FormControl(null)
  });
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
      });
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
    this.posts = this.postService.getPosts(1);
    this.postService.postEvent.subscribe(
      (response: any) => {
        this.posts = response.posts;
        this.friends = response.friends;
      }
    );
  }

  onSubmit() {
    let content = this.sharePostForm.get('content').value;
    let image = this.sharePostForm.get('image').value;
    this.postService.sharePost(content, image);
  }
}
