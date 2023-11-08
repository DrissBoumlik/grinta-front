import { Component, OnInit } from '@angular/core';
import {User} from '../../../user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../profile.service';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-profile-edit-contact',
  templateUrl: './profile-edit-contact.component.html',
  styleUrls: ['./profile-edit-contact.component.css']
})
export class ProfileEditContactComponent implements OnInit {

  profile: User | any;

  editUserForm = new FormGroup({
    phone_number: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });
  constructor(private profileService: ProfileService,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.initForm();
    });
    this.profile = this.profileService.profile;
    this.initForm();
  }

  initForm() {
    this.editUserForm.patchValue({
      phone_number: this.profile.phoneNumber,
      email: this.profile.email,
    });
  }

  onEdit() {
    const profile = {
      phone_number: this.editUserForm.value.phone_number,
      email: this.editUserForm.value.email,
    };

    this.profileService.updateContact(profile)
      .subscribe((response: any) => {
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
