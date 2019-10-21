import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../../Auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usermedias',
  templateUrl: './usermedias.component.html',
  styleUrls: ['./usermedias.component.css']
})
export class UserMediasComponent implements OnInit {
  profile: User;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
  }

}
