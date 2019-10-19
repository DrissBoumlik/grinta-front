import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.profileLoaded.subscribe((user: User) => {
      this.user = user;
      console.log(this.userService.user);
    });
    this.user = this.userService.user ? this.userService.user : (JSON.parse(localStorage.getItem('_profile')) as User);
    console.log(this.user);
  }

}
