import {CommentService} from './comment.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from 'src/app/Auth/auth.service';
import {Comment} from './comment.model';
import {Component, OnInit, Input} from '@angular/core';
import {PostService} from '../../post.service';
import {User} from 'src/app/user/user.model';

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

  editMode = false;
  editCommentForm = this.fb.group({
    content: new FormControl(null),
  });

  constructor(private authService: AuthService,
              private postService: PostService,
              private commentService: CommentService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.ownComment = this.user.id === this.comment.user_id;
    this.commentLiked = this.comment.likers.some((liker: User) => liker.id === this.authService.user.id);
    this.commentService.comment = this.comment;
    this.commentService.repliesUpdated.subscribe((comment) => {
      this.comment = comment;
    });
  }

  onLikeComment() {
    this.commentLiked = this.comment.likers.some((liker: User) => liker.id === this.authService.user.id);
    if (this.commentLiked) {
      this.postService.unlikeComment(this.comment).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.comment.likers.shift();
          }
        }, (error: any) => {
          console.log(error);
        });
    } else {
      this.postService.likeComment(this.comment).subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.comment.likers.unshift(this.authService.user);
          }
        }, (error: any) => {
          console.log(error);
        });
    }
    this.commentLiked = !this.commentLiked;
  }

  onCreateReply() {
    if (this.ReplyForm.valid) {
      const userId = this.user.id;
      const postId = this.comment.post_id;
      const parentId = this.comment.id;
      const content = this.ReplyForm.get('content').value;
      this.postService.createComment(userId, postId, content, parentId)
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
      console.log('You don\'t own this comment');
      return;
    }
    this.postService.deleteComment(this.comment).subscribe((response: any) => {
      // this.postService.removeComment(this.comment);
    });
  }

  onWillReply() {
    this.willReply = true;
    setTimeout(() => {
      jQuery('#reply-' + this.comment.id).focus();
    }, 500);
  }

  onUpdateComment() {
    this.postService.updateComment({content: this.editCommentForm.value.content}, this.comment.id).subscribe((response: any) => {
      // if ((this.profileService.profile && this.authService.user.id === this.profileService.profile.id) || this.pageService.page) {
      //   console.log(this.postsService.user.posts);
      // }
      // this.postsService.addPost(response.post);
      this.comment.content = this.editCommentForm.value.content;
      this.editMode = false;
    });
  }

  onEditComment() {
    this.editMode = true;
    this.editCommentForm.patchValue({
      content: this.comment.content
    });
  }


  onHideComment() {
    this.postService.updateComment({is_visible: 0}, this.comment.id).subscribe((response: any) => {
      this.comment.is_visible = 0;
    });
  }

  onCancel() {
    this.editMode = false;
  }
}
