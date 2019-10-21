import { Album } from './album/album.model';
import { AuthService } from 'src/app/Auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  @Input() albums: Album[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
