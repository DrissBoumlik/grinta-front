import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { User } from '../user.model';
import { LoginService } from 'src/app/login/login.service';

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
    let alreadyLiker = this.post.likers.some((liker: any) => liker.id === this.user.id);
    if(alreadyLiker) this.postLiked = true;
  }

  onLikePost() {
    let alreadyLiker = this.post.likers.some((liker: any) => liker.id === this.user.id);
    this.postLiked = true;
    if(alreadyLiker) {
      console.log('You already like this post');
      return;
    }
    this.postService.likePost(this.post);
  }
}
