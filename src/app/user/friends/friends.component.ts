import { UserService } from './../user.service';
import {Component, OnInit, Input, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { User } from '../user.model';
import {FriendsService} from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: User[];
  noFriends = false;
  @ViewChild('chatBox', {static: false}) chatBox: ElementRef;

  constructor(private userService: UserService,
              private friendsService: FriendsService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.friendsService.getFriends().subscribe((response: any) => {
      this.friends = this.friendsService.friends = response.friends;
      this.noFriends = this.friends.length <= 0;
    });
    // this.friendsService.getChat();
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.chatBox.nativeElement.contains(e.target)) {
        jQuery('.friends-wrapper')
          .addClass('shifted')
          .find('.chat-icon')
          .removeClass('hidden');
        jQuery('.modal-bg')
          .addClass('hidden');
      }
    });
  }

  onSearch(value: string) {
    this.friends = this.friendsService.searchFriends(value.toLowerCase());
  }

  showChatBox() {
    jQuery('.friends-wrapper')
      .removeClass('shifted')
      .find('.chat-icon')
      .addClass('hidden');
    jQuery('.modal-bg')
      .removeClass('hidden');
  }
}
