import { CommentService } from './../comment.service';
import { User } from './../../../../../user.model';
import { PostService } from '../../../post.service';
import { LoginService } from './../../../../../../login/login.service';
import { Comment } from "../comment.model";
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply: Comment;
  user: User;
  replyLiked = false;
  ownReply = false;

  constructor(private loginService: LoginService,
              private postService: PostService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.replyLiked = this.reply.likers.some((liker: any) => liker.id === this.loginService.user.id);
    this.user = this.loginService.user;
    this.ownReply = this.user.id === this.reply.user_id;
  }

  onLikeReply() {
    this.replyLiked = this.reply.likers.some((liker: any) => liker.id === this.loginService.user.id);
    if(this.replyLiked) {
      console.log('You unlike this comment');
      this.postService.unlikeComment(this.reply).subscribe((response: any) => {
        if (response.code === 200) {
          this.reply.likers.shift();
        }
      });
    } else {
      this.postService.likeComment(this.reply).subscribe((response: any) => {
        if (response.code === 200) {
          this.reply.likers.unshift(this.loginService.user);
        }
      });
    }
    this.replyLiked = !this.replyLiked;
  }
  onDeleteReply() {
    if (this.user.id !== this.reply.user_id) {
      console.log("You don't own this comment");
      return;
    }
    this.postService.deleteComment(this.reply).subscribe((response: any) => {
      this.commentService.removeReply(this.reply);
    });
  }

}
