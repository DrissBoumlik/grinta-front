import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {Title} from '@angular/platform-browser';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User | any;
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Messages');
  }

}
