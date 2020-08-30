import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import {User} from '../../../user.model';
import {ChatService} from '../../chat.service';
import {AuthService} from '../../../../Auth/auth.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @Input() user: User;
  authUser: User;
  chats: any[] = [];
  fbDB = firebase.database();
  chatId = null;
  constructor(private chatService: ChatService,
              private authService: AuthService,
              private fb: FormBuilder,
              public datePipe: DatePipe,
              private route: ActivatedRoute) {}

  sendMessageForm = this.fb.group({
    message: new FormControl(null, Validators.required)
  });

  ngOnInit() {
    this.authUser = this.authService.user;
    this.route.params.subscribe((params: Params) => {
      const username = params.username;
      this.chatService.getUser(username).subscribe(
        (response: any) => {
          this.user = response.user;

          if (this.authUser.username < this.user.username) {
            this.chatId = (this.authUser.username + '_' + this.user.username).replace(/\.|\#|\$|\[|\]/g, '_');
          } else {
            this.chatId = (this.user.username + '_' + this.authUser.username).replace(/\.|\#|\$|\[|\]/g, '_');
          }

          this.fbDB.ref(this.chatId).on('value', resp => {
            console.log(resp);
            this.chats = [];
            this.chats = this.snapshotToArray(resp);
            console.log(this.chats);
            // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
          });
        },
        (error: any) => console.log(error)
      );
    });
  }

  snapshotToArray(snapshot: any) {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      console.log(item.date);
      item.sender = item.from === this.user.username ? this.user : this.authUser;
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }

  onSendMessage() {
    console.log(this.sendMessageForm.value);
    const chat = {
      message: this.sendMessageForm.value.message,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss'),
      type: 'message',
      from: this.authUser.username,
      to: this.user.username,
    };
    const newMessage = this.fbDB.ref(this.chatId).push();
    newMessage.set(chat);
    this.sendMessageForm = this.fb.group({
      message : [null, Validators.required]
    });
  }
}
