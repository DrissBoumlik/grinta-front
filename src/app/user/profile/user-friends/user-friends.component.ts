import { Component, OnInit } from '@angular/core';
import {RelationService} from '../../friends/relation.service';
import {User} from '../../user.model';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  authUser: User;
  friends: User[] = [];
  type = 'friends';
  loading = false;
  emptyList = false;
  shouldScroll = false;
  queryPage: number;
  urls = {
    friends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getFriends(this.queryPage++).subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!response.friends.length;
        this.loading = false;
      });
    },
    followings: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getFollowings().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!response.followings.length;
        this.loading = false;
      });
    },
    addedFriends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getAddedFriends().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!response.addedFriends.length;
        this.loading = false;
      });
    },
    cityFriends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getCityFriends(this.authUser.city, this.queryPage++).subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!response.cityFriends.length;
        this.loading = false;
      });
    }
  };

  constructor(private relationService: RelationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.queryPage = 1;
    this.authUser = this.authService.user;
    this.urls[this.type]();
  }

  getRelation(type: string) {
    this.queryPage = 1;
    this.friends = [];
    this.type = type;
    this.urls[type]();
  }

  onLoadMore() {
    if (this.shouldScroll) {
      this.shouldScroll = false;
      this.urls[this.type]();
    }
  }
}
