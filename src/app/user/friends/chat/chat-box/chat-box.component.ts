import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import firebase from 'firebase';
import {User} from '../../../user.model';
import {ChatService} from '../../chat.service';
import {AuthService} from '../../../../auth/auth.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollToBottom', {static: false}) scrollToBottomBox: ElementRef;
  user: User;
  authUser: User;
  chats: any[] = [];
  fbDB = firebase.database();
  chatId = null;
  sendingMessage = false;
  toggleChatList = true;
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
      if (username) {
        this.chatService.getUser(username).subscribe(
          (response: any) => {
            this.user = response.user;

            if (this.authUser.username < this.user.username) {
              this.chatId = (this.authUser.username + '_' + this.user.username).replace(/\.|\#|\$|\[|\]/g, '_');
            } else {
              this.chatId = (this.user.username + '_' + this.authUser.username).replace(/\.|\#|\$|\[|\]/g, '_');
            }

            this.fbDB.ref('chats/' + this.chatId).on('value', resp => {
              // console.log(resp);
              this.chats = [];
              this.chats = this.snapshotToArray(resp);
              // console.log(this.chats);
              this.sendingMessage = true;
              // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
            });
          },
          (error: any) => console.log(error)
        );
      }
    });
  }

  ngAfterViewChecked() {
    if (this.sendingMessage) {
      this.updateScroll();
      this.sendingMessage = false;
    }
  }

  updateScroll() {
    try {
      this.scrollToBottomBox.nativeElement.scrollTop = this.scrollToBottomBox.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  snapshotToArray(snapshot: any) {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.sender = item.fromUsername === this.user.username ? this.user : this.authUser;
      item.receiver = item.fromUsername !== this.user.username ? this.user : this.authUser;
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }

  onSendMessage() {
    this.sendingMessage = true;
    // console.log(this.sendMessageForm.value);
    const chat = {
      message: this.sendMessageForm.value.message,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss'),
      type: 'message',
      fromUsername: this.authUser.username,
      fromFirstname: this.authUser.firstname,
      fromLastname: this.authUser.lastname,
      fromPicture: this.authUser.picture,
      toUsername: this.user.username,
      toFirstname: this.user.firstname,
      toLastname: this.user.lastname,
      toPicture: this.user.picture,
    };
    const newMessage = this.fbDB.ref('chats/' + this.chatId).push();
    newMessage.set(chat);
    this.sendMessageForm = this.fb.group({
      message : [null, Validators.required]
    });
  }

  onToggleChatList() {
    this.chatService.toggleChatList.next(this.toggleChatList);
    this.toggleChatList = !this.toggleChatList;
  }
}
