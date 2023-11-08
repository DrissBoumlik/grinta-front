import { Media } from './media.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @Input() media: Media | any = [];

  constructor() { }

  ngOnInit() {

  }

}
