import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {ChatService} from '../chat.service';
import {User} from '../../user.model';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../../Auth/auth.service';

const config = {
  apiKey: 'AIzaSyBERjm6nvJubSHoBkkmwBDAyfb1mCL55nM',
  databaseURL: 'https://grintaaa.firebaseio.com'
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User;
  authUser: User;
  constructor(private chatService: ChatService,
              private authService: AuthService,
              private route: ActivatedRoute) {
    firebase.initializeApp(config);
    this.authUser = this.authService.user;
    this.route.params.subscribe((params: Params) => {
      const username = params.username;
      this.chatService.getUser(username).subscribe(
        (response: any) => {
          this.user = response.user;
        },
        (error: any) => console.log(error)
      );
    });
    // this.chatService.userLoaded.subscribe(
    //   (friend) => {
    //     this.user = friend;
    //     console.log(friend);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  ngOnInit() {
  }

}
