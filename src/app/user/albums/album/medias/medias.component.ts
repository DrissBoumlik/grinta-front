import { Media } from './media/media.model';
import { LoginService } from 'src/app/login/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  @Input() medias: Media[];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
