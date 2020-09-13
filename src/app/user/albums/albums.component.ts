import { Album } from './album/album.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

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
