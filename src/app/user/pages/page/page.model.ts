import {User} from '../../user.model';

export class Page {
  constructor(
    public id: number,
    public user_id: number,
    public sport_id: number,
    public pagename: string,
    public name: string,
    public description: string,
    public image: string,
    public cover: string,
    public type: string,
    public user: User
  ) {}
}
