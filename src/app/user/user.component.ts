import { AuthService } from '../Auth/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import {ProfileService} from './profile/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  profile: User;
  isFollowed = false;
  isFriend = false;
  ownProfile: boolean;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.authService.isLogged(this.router);
    // let username = this.route.snapshot.params.username;
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      const username = params.username;
      this.profileService.getProfile(username).subscribe((response: any) => {
        this.profile = response.user;
        this.ownProfile = true;
        if (this.profile.id !== this.authService.user.id) {
          this.ownProfile = false;
          // Make request to seed if already follower
          this.isFriend = this.profile.friends.some((friend: User) => friend.id === this.authService.user.id);
          this.isFollowed = this.profile.followers.some((follower: User) => follower.id === this.authService.user.id);
        }
        localStorage.setItem('_profile', JSON.stringify(this.profile));
      });
    });
  }

  onFollowFriend() {
    this.userService.followUser(this.profile.id)
      .subscribe((response: any) => {
        this.isFollowed = true;
      });
  }

  onUnfollowFriend() {
    this.userService.unFollowUser(this.profile.id)
      .subscribe((response: any) => {
        this.isFollowed = false;
      });
  }

  onAddFriend() {
    this.userService.addFriend(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = true;
      });
  }

  onRemoveFriend() {
    this.userService.removeFriend(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = false;
      });
  }

  onEditProfile() {

  }
}
