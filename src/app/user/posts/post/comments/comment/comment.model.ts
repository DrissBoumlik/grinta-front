import { User } from '../../../../user.model';

export class Comment {
  constructor(
    public id: number,
    public uuid: string,
    public user_id: number,
    public post_id: number,
    public body: string,
    public is_visible: number,
    public replies: Comment[],
    public user: User,
    public likers: User[],
    public created_at: string) {}
}
