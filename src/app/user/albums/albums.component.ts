import { Album } from './album/album.model';
import { LoginService } from 'src/app/login/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  @Input() albums: Album[];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
