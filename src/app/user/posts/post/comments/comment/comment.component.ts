import { CommentService } from './comment.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { Comment } from './comment.model';
import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../post.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentService]
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  user: User;
  commentLiked = false;
  willReply = false;
  ownComment = false;
  ReplyForm = this.fb.group({
    content: new FormControl(null, Validators.required),
  });

  constructor(private loginService: LoginService,
              private postService: PostService,
              private commentService: CommentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.loginService.user;
    this.ownComment = this.user.id === this.comment.user_id;
    this.commentLiked = this.comment.likers.some((liker: any) => liker.id === this.loginService.user.id);
    this.commentService.comment = this.comment;
    this.commentService.repliesUpdated.subscribe((comment) => {
      this.comment = comment;
    });
  }

  onLikeComment() {
    this.commentLiked = this.comment.likers.some((liker: any) => liker.id === this.loginService.user.id);
    if (this.commentLiked) {
      console.log('You unlike this comment');
      this.postService.unlikeComment(this.comment).subscribe((response: any) => {
        if (response.code === 200) {
          this.comment.likers.shift();
        }
      });
    } else {
      this.postService.likeComment(this.comment).subscribe((response: any) => {
        if (response.code === 200) {
          this.comment.likers.unshift(this.loginService.user);
        }
      });
    }
    this.commentLiked = !this.commentLiked;
  }

  onCreateReply() {
    if (this.ReplyForm.valid) {
      let user_id = this.user.id;
      let post_id = this.comment.post_id;
      let parent_id = this.comment.id;
      let content = this.ReplyForm.get('content').value;
      this.postService.createComment(user_id, post_id, content, parent_id)
      .subscribe((response: any) => {
        this.commentService.addReply(response.comment);
      });
      this.ReplyForm.reset();
    } else {
      // jQuery('#comment-' + this.post.id).addClass('ng-invalid ng-touched').removeClass('ng-untouched');
    }
  }

  onDeleteComment() {
    if (this.user.id !== this.comment.user_id) {
      console.log("You don't own this comment");
      return;
    }
    this.postService.deleteComment(this.comment).subscribe((response: any) => {
      this.postService.removeComment(this.comment);
    });
  }

  onWillReply() {
    this.willReply = true;
    setTimeout(() => {
      jQuery('#reply-' + this.comment.id).focus();
    }, 500);
  }

}
