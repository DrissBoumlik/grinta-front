import { Media } from './medias/media/media.model';
import { User } from '../../user.model';
export class Album {
  constructor(
    public id: number,
    public user_id: number,
    public name: string,
    public description: string,
    public user: User,
    public medias: Media[],
    public created_at: string) {}
}
