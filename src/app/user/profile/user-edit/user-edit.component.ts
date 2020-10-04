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
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  profile: User;
  sports: Sport[] = [];

  constructor(private userService: UserService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
