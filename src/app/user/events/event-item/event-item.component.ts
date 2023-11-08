import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../event.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() event: Event | any;

  constructor() { }

  ngOnInit() {
  }

}
