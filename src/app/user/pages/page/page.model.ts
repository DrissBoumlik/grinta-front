import {User} from '../../user.model';
import {Post} from '../../posts/post/post.model';
import {Media} from '../../albums/album/medias/media/media.model';
import {Album} from '../../albums/album/album.model';
import {Sport} from '../../sports/sport.model';

export class Page {
  constructor(
    public id: number,
    public uuid: string,
    public user_id: number,
    public sport_id: number,
    public pagename: string,
    public name: string,
    public description: string,
    public image: string,
    public cover: string,
    public type: string,
    public user: User,
    public posts: Post[],
    public medias: Media[],
    public albums: Album[],
    public likers: User[],
    public sport: Sport
  ) {}
}
