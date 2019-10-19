import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-usermedias',
  templateUrl: './usermedias.component.html',
  styleUrls: ['./usermedias.component.css']
})
export class UserMediasComponent implements OnInit {
  profile: User;

  constructor(private userService: UserService,
              private profileService: ProfileService) {
    this.profile = this.profileService.profile;
  }

  ngOnInit() {
    this.profileService.profileLoaded.subscribe((user: User) => {
      this.profile = user;
      console.log(this.profile);
      // this.userService.posts = this.posts;
    });
    // this.user = JSON.parse(localStorage.getItem('_profile'));
    // this.user = (this.user === undefined || this.user === null) ? this.userService.profile : this.user;
    // this.loginService.isLogged(this.router);
    //
    // console.log(this.user);
    //
    // this.userService.postsUpdated.subscribe((posts) => {
    //   this.posts = posts;
    // });
  }

}
