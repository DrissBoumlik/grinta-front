import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
  }

}
