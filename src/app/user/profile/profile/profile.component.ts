import {Component, OnInit} from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FeedbackService} from '../../../shared/feedback/feedback.service';
import {RelationService} from '../../friends/relation.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: User;
  followParams = {text: 'follow', status: 0};
  friendParams = {text: 'add friend', status: 0};
  ownProfile: boolean;

  constructor(private userService: UserService,
              private relationService: RelationService,
              private profileService: ProfileService,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private titleService: Title,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle('Profile');
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
        this.titleService.setTitle(this.profile.fullName);
        this.ownProfile = true;
        if (this.profile.id !== this.authService.user.id) {
          this.ownProfile = false;
        }
        localStorage.setItem('profile', JSON.stringify(this.profile));

        this.relationService.getRelation({user_1: this.authService.user.id, user_2: this.profile.id})
          .subscribe((response2: any) => {
            if (response2.data) {
              const relation = response2.data;
              if (relation.type === 'friend') {
                switch (relation.status) {
                  case 'pending':
                    if (this.authService.user.id === relation.start_user_id) {
                      this.friendParams = { text: 'cancel', status: 12 };
                      this.followParams = { text: 'unfollow', status: 1 };
                    } else {
                      this.friendParams = { text: 'confirm', status: 11 };
                    }
                    break;
                  case 'accepted':
                    this.friendParams = { text: 'unfriend', status: 2 };
                    this.followParams = { text: 'unfollow', status: 1 };
                    break;
                  case 'declined': break;
                  case 'blocked': break;
                }
              } else if (relation.type === 'follower') {
                if (this.authService.user.id === relation.start_user_id) {
                  this.followParams = { text: 'unfollow', status: 1 };
                }
              }
            }
          });
      },
      (error: any) => console.log(error)
    );
  }

  onToggleFollow() {
    if (this.followParams.status === 1) {
      this.onUnfollowFriend();
    } else {
      this.onFollowFriend();
    }
  }

  onFollowFriend() {
    this.userService.followUser(this.profile.id)
      .subscribe((response: any) => {
        this.followParams = { text: 'unfollow', status: 1 };
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onUnfollowFriend() {
    this.userService.unFollowUser(this.profile.id)
      .subscribe((response: any) => {
        this.followParams = { text: 'follow', status: 0 };
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onToggleFriend() {
    if (this.friendParams.status === 12) {
      // cancel request
      this.onCancelRequest();
    } else if (this.friendParams.status === 11) {
      // Accept request
      this.onAcceptRequest();
    } else if (this.friendParams.status === 2) {
      this.onRemoveFriend();
    } else if (this.friendParams.status === 0) {
      this.onAddFriend();
    }
  }

  onAddFriend() {
    this.userService.addFriend(this.profile.id)
      .subscribe((response: any) => {
        this.friendParams = {text : 'cancel', status: 12};
        this.followParams = {text : 'unfollow', status: 1};
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onRemoveFriend() {
    this.userService.removeFriend(this.profile.id)
      .subscribe((response: any) => {
        this.friendParams = {text : 'add friend', status: 0};
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onAcceptRequest() {
    this.userService.acceptRequest(this.profile.id)
      .subscribe((response: any) => {
        this.friendParams = {text : 'unfriend', status: 2};
        this.followParams = {text : 'unfollow', status: 1};
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onCancelRequest() {
    this.userService.cancelRequest(this.profile.id)
      .subscribe((response: any) => {
        this.friendParams = {text : 'add friend', status: 0};
        this.followParams = {text : 'follow', status: 0};
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      });
  }

  onDeleteRequest() {
    // Decline friend request
    this.onCancelRequest();
  }
}
