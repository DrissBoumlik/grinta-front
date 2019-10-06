import { LoginService } from 'src/app/login/login.service';
import { Comment } from './comment.model';
import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  commentLiked = false;

  constructor(private loginService: LoginService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.commentLiked = this.comment.likers.some((liker: any) => liker.id === this.loginService.user.id);
  }

  onLikeComment() {
    this.commentLiked = this.comment.likers.some((liker: any) => liker.id === this.loginService.user.id);
    if(this.commentLiked) {
      console.log('You already like this comment');
      this.commentService.unlikeComment(this.comment).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          this.comment.likers.shift();
        }
      });
    } else {
      this.commentService.likeComment(this.comment).subscribe((response: any) => {
        console.log(response);
        if (response.code === 200) {
          this.comment.likers.unshift(this.loginService.user);
        }
      });
    }
    this.commentLiked = !this.commentLiked;
  }

}
