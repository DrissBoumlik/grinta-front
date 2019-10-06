import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { User } from '../../user.model';
import { LoginService } from 'src/app/login/login.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  user: User;
  likers = [];
  postLiked = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
    this.postLiked = this.post.likers.some((liker: any) => liker.id === this.user.id);
  }

  onLikePost() {
    this.postLiked = this.post.likers.some((liker: any) => liker.id === this.user.id);
    if(this.postLiked) {
      console.log('You already like this post');
      this.postService.unlikePost(this.post).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          this.post.likers.shift();
        }
      });
    } else {
      this.postService.likePost(this.post).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          this.post.likers.unshift(this.user);
        }
      });
    }
    this.postLiked = !this.postLiked;
  }

  onSharePost() {
    let owner_id = this.post.post_owner_id === null ? this.post.user_id : this.post.post_owner_id;
    this.postService.sharePost(this.post.content, this.post.image, owner_id).subscribe((response) => {
          console.log(response);
          this.postService.addPost(response.post);
    });
  }

  onFocusInput() {
    jQuery('#comment-' + this.post.id).focus();
  }
}
