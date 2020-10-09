import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {AuthService} from '../../../../auth/auth.service';
import {ChatService} from '../../chat.service';
import * as firebase from 'firebase';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  authUser: User;
  fbDB = firebase.database();
  chatDB = 'chats';
  chatList: User[] = [];
  constructor(private authService: AuthService,
              private userService: UserService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    this.chatService.toggleChatList.subscribe(
      (value) => console.log(value),
    );

    this.fbDB.ref(this.chatDB).on('value', resp => {
      const userNames = this.snapshotToArray(resp);
      this.userService.getUsers(userNames).subscribe(
        (response: any) => {
          this.chatList = response.users;
        },
        error => console.log(error)
      );
      // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }

  snapshotToArray(snapshot: any) {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const items: any = Object.values(childSnapshot.val());
      const chat = {
        userFrom: items[0].from,
        userTo: items[0].to
      };
      // item.sender = item.from === this.user.username ? this.user : this.authUser;
      // item.receiver = item.from !== this.user.username ? this.user : this.authUser;
      // items.key = childSnapshot.key;
      returnArr.push(this.authUser.username === chat.userFrom ? chat.userTo : chat.userFrom);
    });

    return returnArr;
  }

}
