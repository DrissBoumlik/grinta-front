import { LoginService } from 'src/app/login/login.service';
import { CommentService } from './comment.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Comment } from './comment/comment.model';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() post: Post;

  CommentForm = this.fb.group({
    content: new FormControl(null),
  });
  
  constructor(private fb: FormBuilder,
              private commentService: CommentService,
              private loginService: LoginService) {}

  ngOnInit() {
  }
  
  onCreateComment() {
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

}
