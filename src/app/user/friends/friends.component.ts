import { UserService } from './../user.service';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
              private friendsService: FriendsService) { }

  ngOnInit() {
    this.friendsService.getFriends().subscribe((response: any) => {
      this.friends = this.friendsService.friends = response.friends;
      this.noFriends = this.friends.length <= 0;
    });
  }

  onSearch(value: string) {
    this.friends = this.friendsService.searchFriends(value.toLowerCase());
  }

  arrayNTimes(length: number) {
    return Array(length);
  }
}
