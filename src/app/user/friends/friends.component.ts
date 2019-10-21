import { UserService } from './../user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: User[];
  noFriends = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFriends().subscribe((response: any) => {
      this.friends = response.friends;
      this.noFriends = this.friends.length <= 0;
    });
  }
}
