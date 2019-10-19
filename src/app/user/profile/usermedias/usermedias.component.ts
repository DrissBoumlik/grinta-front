import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-usermedias',
  templateUrl: './usermedias.component.html',
  styleUrls: ['./usermedias.component.css']
})
export class UserMediasComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.profileLoaded.subscribe((user: User) => {
    //   this.user = user;
    //   this.userService.posts = this.posts;
    // });
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
