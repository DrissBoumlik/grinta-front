import { User } from '../../user.model';
export class Post {
  constructor(
    public id: number,
    public user_id: number,
    public post_owner_id: number,
    public content: string,
    public image: string,
    public user: User,
    public owner: User,
    public likers: [],
    public comments: [],
    public created_at: string) {}
}
