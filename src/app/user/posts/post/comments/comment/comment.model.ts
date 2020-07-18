import { User } from '../../../../user.model';

export class Comment {
  constructor(
    public id: number,
    public user_id: number,
    public post_id: number,
    public content: string,
    public isVisible: number,
    public replies: Comment[],
    public user: User,
    public likers: User[],
    public created_at: string) {}
}
