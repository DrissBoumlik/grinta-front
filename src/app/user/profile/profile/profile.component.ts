import {Component, OnInit} from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FeedbackService} from '../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: User;
  isFollowed = false;
  isFriend: number;
  // Nothing = 0;
  // requested = 1;
  // request = -1;
  // friend = 0 (accepted);
  // blocked = -2
  friendshipStatusText = '';
  followshipStatusText = '';
  isPending = false;
  ownProfile: boolean;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    let username = this.route.snapshot.params.username;
    this.onGetProfile(username);
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      username = params.username;
      this.onGetProfile(username);
    });
    this.profileService.profileUpdated.subscribe((profile: User) => {
      this.profile = profile;
    });
  }

  onGetProfile(username: string) {
    this.profileService.getProfile(username).subscribe(
      (response: any) => {
        this.profile = response.user;
        this.ownProfile = true;
        if (this.profile.id !== this.authService.user.id) {
          this.ownProfile = false;
          const requested = this.profile.requested.some((user: User) => user.uuid === this.authService.user.uuid);
          const request = this.profile.requests.some((user: User) => user.uuid === this.authService.user.uuid);
          const friend = this.profile.friends.some((user: User) => user.id === this.authService.user.id);
          // const block = this.profile.friends.some((friend: User) => friend.id === this.authService.user.id);
          // if requested
          if (requested) {
            this.isFriend = 1;
            this.friendshipStatusText = 'Accept';
          } else if (request) {
            this.isFriend = -1;
            this.friendshipStatusText = 'Cancel';
          } else if (friend) {
            this.isFriend = 0;
            this.friendshipStatusText = 'Unfriend';
          }
          // else if (block) {
          //   this.isFriend = -2;
          //   this.friendshipStatusText = 'Block';
          // }
          else {
            this.isFriend = 2;
            this.friendshipStatusText = 'Add friend';
          }

          // this.isFriend = this.profile.friends.some((friend: User) => friend.id === this.authService.user.id);
          this.isFollowed = this.profile.followers.some((follower: User) => follower.id === this.authService.user.id);
          this.followshipStatusText = 'Follow';
          if (this.isFollowed) {
            this.followshipStatusText = 'Unfollow';
          }
          this.isPending = this.profile.pendingFriends.some((pendingFriend: User) => pendingFriend.id === this.authService.user.id);
        }
        localStorage.setItem('currentProfile', JSON.stringify(this.profile));
      },
      (error: any) => console.log(error)
    );
  }

  onToggleFollow() {
    if (this.isFollowed) {
      this.onUnfollowFriend();
      this.followshipStatusText = 'Follow';
    } else {
      this.onFollowFriend();
      this.followshipStatusText = 'Unfollow';
    }
  }

  onFollowFriend() {
    this.userService.followUser(this.profile.id)
      .subscribe((response: any) => {
        this.isFollowed = true;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onUnfollowFriend() {
    this.userService.unFollowUser(this.profile.id)
      .subscribe((response: any) => {
        this.isFollowed = false;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onToggleFriend() {
    if (this.isFriend === -1) {
      // cancel request
      this.onCancelRequest();
      this.friendshipStatusText = 'Add friend';
    }
    else if (this.isFriend === 1) {
      // Accept request
      this.onAcceptRequest();
      this.friendshipStatusText = 'Unfriend';
    }
    else if (this.isFriend === 0) {
      this.onRemoveFriend();
      this.friendshipStatusText = 'Add friend';
    }
    else if (this.isFriend === 2) {
      this.onAddFriend();
      this.friendshipStatusText = 'Cancel';
    }
  }

  onAddFriend() {
    this.userService.addFriend(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = -1;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onRemoveFriend() {
    this.userService.removeFriend(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = 2;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onAcceptRequest() {
    this.userService.acceptRequest(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = 0;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onCancelRequest() {
    this.userService.cancelRequest(this.profile.id)
      .subscribe((response: any) => {
        this.isFriend = 2;
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }
}
