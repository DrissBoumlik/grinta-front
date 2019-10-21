import { Media } from './media/media.model';
import { AuthService } from 'src/app/Auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  @Input() medias: Media[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
