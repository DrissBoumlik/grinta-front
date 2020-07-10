import { Subject } from 'rxjs';
import { Comment } from './comment.model';

export class CommentService {
  comment: Comment;
  repliesUpdated = new Subject<Comment>();

  constructor() {}

  addReply(reply: Comment) {
    this.comment.replies.unshift(reply);
    this.repliesUpdated.next(this.comment);
  }

  removeReply(reply: Comment) {
    this.comment.replies = this.comment.replies.filter((replyItem) => replyItem.id !== reply.id);
    this.repliesUpdated.next(this.comment);
  }
}
