import {User} from './../../../user.model';
import {AuthService} from 'src/app/Auth/auth.service';
import {PostService} from '../post.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() post: Post;
  user: User;

  CommentForm = this.fb.group({
    body: new FormControl(null, Validators.required),
  });

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.postService.post = this.post;
    this.postService.postCommentsUpdated.subscribe((comments) => {
      this.post.comments = comments;
    });
  }

  onCreateComment() {
    if (this.CommentForm.valid) {
      const userId = this.user.id;
      const postId = this.post.id;
      const body = this.CommentForm.get('body').value;
      this.postService.createComment({user_id: userId, post_id: postId, body, parent_id: null})
      .subscribe((response: any) => {
        // this.comments.unshift(response.comment)
        this.postService.addComment(response.comment);
      });
      this.CommentForm.reset();
    } else {
      jQuery('#comment-' + this.post.id).addClass('ng-invalid ng-touched').removeClass('ng-untouched');
    }
  }

}
