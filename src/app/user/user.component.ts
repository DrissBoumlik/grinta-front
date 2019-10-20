import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.loginService.isLogged(this.router);
    const username = this.route.snapshot.params.username;
    console.log('username : ' + username);
    this.profileService.getProfile(username).subscribe((response: any) => {
      this.profile = response.user;
      localStorage.setItem('_profile', JSON.stringify(this.profile));
    });
    // this.profile = JSON.parse(localStorage.getItem('_profile'));
    // this.profile = (this.profile === undefined || this.profile === null) ? this.profileService.profile : this.profile;
  }
}
