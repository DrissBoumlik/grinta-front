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
  chatList: (User | any)[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    this.chatService.toggleChatList.subscribe(
      (value) => console.log(value),
    );

    this.fbDB.ref(this.chatDB).on('value', resp => {
      const results = this.snapshotToArray(resp);
      this.userService.getUsers(results.userNames).subscribe(
        (response: any) => {
          this.chatList = response.users;
          this.chatService.chatList = this.chatList = this.chatList.filter((user) => {
            return results.chats.filter((chat) => {
                if (user.username === chat.username) {
                  user.lastMsg = chat.lastMsg;
                  user.dateMsg = chat.date;
                  return user;
                }
                return null;
            });
          });
          this.chatService.chatList = this.chatList = this.chatList.sort((chatItem1, chatItem2) => {
              if (chatItem1.dateMsg > chatItem2.dateMsg) {
                return -1;
              }
              if (chatItem1.dateMsg < chatItem2.dateMsg) {
                return 1;
              }
              return 0;
          });
          console.log(this.chatList);
        },
        error => console.log(error)
      );
      // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }

  snapshotToArray(snapshot: any) {
    const returnArr = [];
    const chats = [];

    snapshot.forEach((childSnapshot: any) => {
      const items: any = Object.values(childSnapshot.val());
      const lastItem = items[items.length - 1];
      const ChatUserWith = this.authUser.username === lastItem.fromUsername ? lastItem.toUsername : lastItem.fromUsername;
      const chat = {
        username: ChatUserWith,
        lastMsg: lastItem.message,
        date: lastItem.date
      };
      if (this.authUser.username === lastItem.fromUsername || this.authUser.username === lastItem.toUsername) {
        chats.push(chat);
        returnArr.push(chat.username);
      }
    });

    return {userNames: returnArr, chats};
  }

  onSearch(value: string) {
    this.chatList = this.chatService.searchChatList(value.toLowerCase());
  }
}
