import {Component, OnInit} from '@angular/core';
import {User} from '../../../user.model';
import {ProfileService} from '../../profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Sport} from '../../../sports/sport.model';
import {UserService} from '../../../user.service';
import {SportService} from '../../../../shared/sport.service';
import {ToolsService} from '../../../../shared/tools.service';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-profile-edit-info',
  templateUrl: './profile-edit-info.component.html',
  styleUrls: ['./profile-edit-info.component.css']
})
export class ProfileEditInfoComponent implements OnInit {

  profile: User;
  sports: Sport[] = [];
  cities = [];
  imageToUpload: any = File;

  editUserForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    birth_date: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    picture: new FormControl(null),
    cover: new FormControl(null),
    // email: new FormControl(null, Validators.required),
    // password: new FormControl(null, Validators.required),
    // password_confirmation: new FormControl(null, Validators.required),
    // sport: new FormControl(null, Validators.required)
  });
  constructor(private userService: UserService,
              private profileService: ProfileService,
              private sportService: SportService,
              private feedbackService: FeedbackService,
              private toolsService: ToolsService) { }

  ngOnInit() {
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });
    // this.toolsService.getCities().subscribe((response: any) => {
    //   this.cities = response;
    // });
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.initForm();
    });
    this.profile = this.profileService.profile;
    if (this.profile) {
      this.initForm();
    }
  }

  selectedSport(sport: Sport) {
    return this.profile.sports.some(selectedSport => selectedSport.id === sport.id);
  }

  initForm() {
    this.editUserForm.patchValue({
      username: this.profile.username,
      firstname: this.profile.firstname,
      lastname: this.profile.lastname,
      gender: this.profile.gender,
      birth_date: this.profile.birth_date,
      city: this.profile.city,
      country: this.profile.country,
      address: this.profile.address,
      // email: this.profile.email,
    });
  }

  onFilePictureChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.editUserForm.get('picture').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onEdit() {
    const profile = {
      username: this.editUserForm.value.username,
      firstname: this.editUserForm.value.firstname,
      lastname: this.editUserForm.value.lastname,
      // email: this.editUserForm.value.email,
      // password: this.editUserForm.value.password,
      // passwordConfirmation: this.editUserForm.value.password_confirmation,
      gender: this.editUserForm.value.gender,
      birth_date: this.editUserForm.value.birth_date,
      picture: this.editUserForm.value.picture,
      cover: this.editUserForm.value.cover,
      // sport: this.editUserForm.value.sport,
      address: this.editUserForm.value.address,
      city: this.editUserForm.value.city,
      country: this.editUserForm.value.country
    };

    this.profileService.updateProfile(profile)
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
