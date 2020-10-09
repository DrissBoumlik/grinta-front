import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {AuthService} from '../../../../auth/auth.service';
import {ChatService} from '../../chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  authUser: User;
  constructor(private authService: AuthService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    this.chatService.toggleChatList.subscribe(
      (value) => console.log(value),
    );
  }

}
