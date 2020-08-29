import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../user.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
