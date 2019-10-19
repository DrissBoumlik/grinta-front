export class Event {
  constructor(
    public id: number,
    public user_id: number,
    public name: string,
    public description: string,
    public date: string,
    public address: string,
    public location: string,
    public limit_signup: string,
    public image: string,
    public cover: string,
    public type: string,
  ) {}
}
