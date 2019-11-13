import { User } from './../../../user.model';
import { AuthService } from 'src/app/Auth/auth.service';
import { PostService } from '../post.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from "./comment/comment.model";
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Subject } from 'rxjs';
import * as jquery from 'jquery';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() post: Post;
  user: User;

  CommentForm = this.fb.group({
    content: new FormControl(null, Validators.required),
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
      let user_id = this.user.id;
      let post_id = this.post.id;
      let content = this.CommentForm.get('content').value;
      this.postService.createComment(user_id, post_id, content)
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
