import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {SportService} from '../../../shared/sport.service';
import {Sport} from '../../sports/sport.model';
import {ToolsService} from '../../../shared/tools.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  profile: User;
  sports: Sport[] = [];
  cities = [];
  imageToUpload: any = File;
  editUserForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    picture: new FormControl(null),
    cover: new FormControl(null),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    password_confirmation: new FormControl(null, Validators.required),
    sport: new FormControl(null, Validators.required)
  });
  constructor(private userService: UserService,
              private profileService: ProfileService,
              private sportService: SportService,
              private toolsService: ToolsService) { }

  ngOnInit() {
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });
    this.toolsService.getCities().subscribe((response: any) => {
      this.cities = response;
    });
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
      this.initForm();
    });
    this.profile = this.profileService.profile;
    if (this.profile) {
      this.initForm();
    }
  }

  initForm() {
    this.editUserForm.patchValue({
      username: this.profile.username,
      firstname: this.profile.firstname,
      lastname: this.profile.lastname,
      gender: this.profile.gender,
      city: this.profile.city,
      email: this.profile.email,
    });
  }

  selectedSport(sport: Sport) {
    return this.profile.sports.some(selectedSport => selectedSport.id === sport.id);
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

  onFileCoverChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.editUserForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onEdit() {
    this.profileService.updateProfile(this.editUserForm.value.username, this.editUserForm.value.firstname,
      this.editUserForm.value.lastname, this.editUserForm.value.email,
      this.editUserForm.value.password, this.editUserForm.value.password_confirmation,
      this.editUserForm.value.gender, this.editUserForm.value.picture,
      this.editUserForm.value.cover, this.editUserForm.value.sport,
      this.editUserForm.value.city)
      .subscribe((response: any) => {
        this.profileService.getProfile(response.user.username).subscribe((data: any) => {
          this.profileService.profileUpdated.next(data.user);
        });
      });
  }
}
