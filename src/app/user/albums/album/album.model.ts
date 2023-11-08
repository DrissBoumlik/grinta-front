import { Media } from './medias/media/media.model';
import { User } from '../../user.model';
export class Album {
  constructor(
    public id: number,
    public uuid: string,
    public user_id: number,
    public name: string,
    public description: string,
    public user: User,
    public medias: Media[],
    public created_at: string,
    public thumbnail: string) {}

  getThumnail() {
     let _media = this.medias.find((media: any) => {
      if (media.type !== 'video') {
        return media;
      }
    });
     this.thumbnail = _media !== undefined ? _media.media_url : 'https://images2.imgbox.com/44/60/vPRtiGOQ_o.png';
  }
}
