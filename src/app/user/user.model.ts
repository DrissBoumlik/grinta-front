import { Media } from './albums/album/medias/media/media.model';
import { Album } from './albums/album/album.model';
import {Page} from './pages/page/page.model';
import {Event} from './events/event.model';
import {Post} from './posts/post/post.model';
import {Sport} from './sports/sport.model';

export class User {
  constructor(
    public id: number,
    public uuid: string,
    public email: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public about: string,
    public fullName: string,
    public gender: string,
    public birth_date: string,
    public phoneNumber: string,
    public address: string,
    public city: string,
    public country: string,
    public picture: string,
    public cover: string,
    public isSocial: boolean,
    public isOnline: boolean,
    public friends: User[],
    public followers: User[],
    public following: User[],
    public pages: Page[],
    public adminedPages: Page[],
    public moderatedPages: Page[],
    public events: Event[],
    public eventInvitations: Event[],
    public posts: Post[],
    public likedPages: Page[],
    public medias: Media[],
    public photos: Media[],
    public albums: Album[],
    public sports: Sport[]
  ) {}
}
