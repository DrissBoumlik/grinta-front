import { Component, OnInit, Input } from '@angular/core';
import { Album } from './album.model';
import {ActivatedRoute, Params} from '@angular/router';
import {ProfileService} from '../../profile/profile.service';
import {User} from '../../user.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  @Input() album: Album;
  profile: User;
  constructor(private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    let album_id;
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.album = this.profileService.getAlbum(album_id);
    });
    this.route.params.subscribe((params: Params) => {
      album_id = +params.id;
      this.album = this.profileService.getAlbum(params.id);
      console.log(this.album);
    });
    this.profile = this.profileService.profile;
  }

}
