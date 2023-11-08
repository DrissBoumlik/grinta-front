import {Subject} from 'rxjs';
import {Comment} from './comment.model';
import {Injectable} from '@angular/core';
import {PostService} from '../../post.service';

@Injectable()
export class CommentService {
  comment: Comment | any;
  repliesUpdated = new Subject<Comment>();

  constructor(private  postService: PostService) {}

  addReply(reply: Comment) {
    this.comment.replies.unshift(reply);
    this.repliesUpdated.next(this.comment);
    this.postService.post.comments = this.postService.post.comments.map((commentItem: any) => {
      if (commentItem.id === this.comment.id) {
        return this.comment;
      }
      return commentItem;
    });
    this.postService.postCommentsUpdated.next(this.postService.post.comments);
  }

  removeReply(reply: Comment) {
    this.comment.replies = this.comment.replies.filter((replyItem: any) => replyItem.id !== reply.id);
    this.repliesUpdated.next(this.comment);
    this.postService.post.comments = this.postService.post.comments.map((commentItem: any) => {
      if (commentItem.id === this.comment.id) {
        return this.comment;
      }
      return commentItem;
    });
    this.postService.postCommentsUpdated.next(this.postService.post.comments);
  }
}
