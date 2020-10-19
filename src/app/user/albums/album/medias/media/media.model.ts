import { User } from '../../../../user.model';
import { Album } from '../../album.model';
export class Media {
  constructor(
    public id: number,
    public uuid: string,
    public user_id: number,
    public album_id: number,
    public name: string,
    public description: string,
    public type: string,
    public media_url: string,
    public user: User,
    public album: Album,
    public created_at: string) {}
}
