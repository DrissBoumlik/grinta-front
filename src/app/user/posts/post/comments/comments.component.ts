import { LoginService } from 'src/app/login/login.service';
import { CommentService } from './comment.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from './comment/comment.model';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Subject } from 'rxjs';
import * as jquery from 'jquery';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() post: Post;

  CommentForm = this.fb.group({
    content: new FormControl(null, Validators.required),
  });

  constructor(private fb: FormBuilder,
              private commentService: CommentService,
              private loginService: LoginService) {}

  ngOnInit() {
  }

  onCreateComment() {
    if (this.CommentForm.valid) {
      let user_id = this.loginService.user.id;
      let post_id = this.post.id;
      let content = this.CommentForm.get('content').value;
      this.commentService.createComment(user_id, post_id, content)
      .subscribe((response: any) => {
        // this.comments.unshift(response.comment)
        this.comments = this.commentService.addComment(this.comments, response.comment);
      });
      this.CommentForm.reset();
    }
    else {
      jQuery('#comment-' + this.post.id).addClass('ng-invalid ng-touched').removeClass('ng-untouched');
    }
  }

}
