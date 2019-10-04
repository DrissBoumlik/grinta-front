
export class Comment {
  constructor(
    public id: number,
    public user_id: number,
    public post_id: number,
    public content: string) {}
}
