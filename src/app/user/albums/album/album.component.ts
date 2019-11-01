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
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.album = this.profileService.getAlbum(+this.route.snapshot.params.id);
    });
    this.profile = this.profileService.profile;
    this.route.params.subscribe((params: Params) => {
      this.album = this.profileService.getAlbum(+params.id);
    });
  }

}
