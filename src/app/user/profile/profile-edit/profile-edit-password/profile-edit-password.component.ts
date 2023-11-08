import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../profile.service';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';
import {User} from '../../../user.model';

@Component({
  selector: 'app-profile-edit-password',
  templateUrl: './profile-edit-password.component.html',
  styleUrls: ['./profile-edit-password.component.css']
})
export class ProfileEditPasswordComponent implements OnInit {

  profile: User | any;

  editUserForm = new FormGroup({
    password_old: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    password_confirmation: new FormControl(null, Validators.required),
  });
  constructor(private profileService: ProfileService,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

  onEdit() {
    const profile = {
      password_old: this.editUserForm.value.password_old,
      password: this.editUserForm.value.password,
      password_confirmation: this.editUserForm.value.password_confirmation,
    };

    this.profileService.updatePassword(profile)
      .subscribe((response: any) => {
          this.profileService.getProfile(response.user.username).subscribe((data: any) => {
            this.profileService.profileUpdated.next(data.user);
          });

          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }
}
