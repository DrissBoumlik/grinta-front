import { Media } from './albums/album/medias/media/media.model';
import { Album } from './albums/album/album.model';
import {Page} from './pages/page/page.model';
import {Event} from './events/event.model';
import {Post} from './posts/post/post.model';

export class User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public sex: string,
    public picture: string,
    public cover: string,
    public pages: Page[],
    public managed_pages: Page[],
    public page_invitations: Page[],
    public events: Event[],
    public event_invitations: Event[],
    public posts: Post[],
    public liked_pages: Page[],
    public medias: Media[],
    public albums: Album[]
  ) {}
}
