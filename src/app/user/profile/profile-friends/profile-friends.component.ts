import { Component, OnInit } from '@angular/core';
import {RelationService} from '../../friends/relation.service';
import {User} from '../../user.model';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {
  authUser: User | any;
  friends: User[] = [];
  type = 'friends';
  loading = false;
  emptyList = false;
  shouldScroll = false;
  queryPage: number = 1;
  urls: any = {
    friends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getFriends(this.queryPage++).subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    requests: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getRequests().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    requested: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getRequested().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    followings: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getFollowings().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    followers: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getFollowers().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    addedFriends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getAddedFriends().subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
        this.loading = false;
      });
    },
    cityFriends: () => {
      this.loading = true;
      this.emptyList = false;
      this.relationService.getCityFriends(this.authUser.city, this.queryPage++).subscribe((response: any) => {
        this.friends = this.relationService.friends;
        this.emptyList = !this.friends.length;
        this.shouldScroll = !!this.friends.length;
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
