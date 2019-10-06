import { User } from 'src/app/user/user.model';

export class Comment {
  constructor(
    public id: number,
    public user_id: number,
    public post_id: number,
    public content: string,
    public user: User,
    public likers: User[],
    public created_at: string) {}
}
