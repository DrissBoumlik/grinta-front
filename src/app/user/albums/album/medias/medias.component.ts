import { Media } from './media/media.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  @Input() medias: Media[];
  constructor() { }

  ngOnInit() {
  }

}
