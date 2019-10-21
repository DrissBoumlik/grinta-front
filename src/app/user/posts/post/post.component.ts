import { AuthService } from '../../../Auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { UserService } from '../../user.service';
import { PostService } from './post.service';
import { User } from '../../user.model';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  user: User;
  ownPost = false;
  postLiked = false;

  constructor(private userService: UserService,
              private postService: PostService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('_user')) as User;
    this.user = this.authService.user;
    this.ownPost = this.user.id === this.post.user_id;
    this.postLiked = this.post.likers.some((liker: any) => liker.id === this.user.id);
    this.postService.postCommentsUpdated.subscribe((comments) => {
      this.post.comments = comments;
    });
  }

  onLikePost() {
    this.postLiked = this.post.likers.some((liker: any) => liker.id === this.user.id);
    if (this.postLiked) {
      console.log('You unlike this post');
      this.userService.unlikePost(this.post).subscribe((response: any) => {
        if (response.code === 200) {
          this.post.likers.shift();
        }
      });
    } else {
      this.userService.likePost(this.post).subscribe((response: any) => {
        if (response.code === 200) {
          this.post.likers.unshift(this.user);
        }
      });
    }
    this.postLiked = !this.postLiked;
  }

  onSharePost() {
    const owner_id = this.post.post_owner_id === null ? this.post.user_id : this.post.post_owner_id;
    this.userService.sharePost(this.post.content, this.post.image, owner_id).subscribe((response) => {
          this.userService.addPost(response.post);
    });
  }

  onFocusInput() {
    jQuery('#comment-' + this.post.id).focus();
  }

  onDeletePost() {
    if (this.user.id !== this.post.user_id) {
      console.log("You don't own this post");
      return;
    }
    this.userService.deletePost(this.post.id).subscribe((response: any) => {
      this.userService.removePost(this.post);
    });
  }
}
