import {User} from '../user.model';

export class Event {
  constructor(
    public id: number,
    public uuid: string,
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
    public user: User,
    public users: User[]
  ) {}
}
