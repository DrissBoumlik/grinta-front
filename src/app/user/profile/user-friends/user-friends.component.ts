import { Component, OnInit } from '@angular/core';
import {RelationService} from '../../friends/relation.service';
import {User} from '../../user.model';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  friends: User[];
  followings: User[];
  addedFriends: User[];

  constructor(private relationService: RelationService) { }

  ngOnInit() {
    this.relationService.getFriends().subscribe((response: any) => {
      console.log(response);
      this.friends = this.relationService.friends = response.friends;
    });
    this.relationService.getFollowings().subscribe((response: any) => {
      console.log(response);
      this.followings = this.relationService.followings = response.followings;
    });
    this.relationService.getAddedFriends().subscribe((response: any) => {
      console.log(response);
      this.addedFriends = this.relationService.addedFriends = response.addedFriends;
    });
  }
}
