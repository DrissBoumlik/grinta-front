import { Comment } from './comments/comment/comment.model';
import { User } from '../../user.model';
import {Page} from '../../pages/page/page.model';
export class Post {
  constructor(
    public id: number,
    public uuid: string,
    public user_id: number,
    public post_owner_id: number,
    public page_id: number,
    public body: string,
    public image: string,
    public user: User,
    public owner: User,
    public page: Page,
    public likers: User[],
    public comments: Comment[],
    public created_at: string,
    public updated_at: string) {}

    addComment(comment: Comment) {
      this.comments.unshift(comment);
    }

    updateComments(comments: Comment[]) {
      this.comments = comments;
    }
}
