import { Media } from './albums/album/medias/media/media.model';
import { Album } from './albums/album/album.model';

export class User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public picture: string,
    public medias: Media[],
    public albums: Album[]) {}
}
