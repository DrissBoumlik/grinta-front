import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import {User} from '../../../user.model';
import {ChatService} from '../../chat.service';
import {AuthService} from '../../../../Auth/auth.service';

const config = {
  apiKey: 'AIzaSyBERjm6nvJubSHoBkkmwBDAyfb1mCL55nM',
  databaseURL: 'https://grintaaa.firebaseio.com'
};

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @Input() user: User;
  authUser: User;
  constructor(private chatService: ChatService,
              private authService: AuthService,
              private route: ActivatedRoute) {}

  ngOnInit() {

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

}
