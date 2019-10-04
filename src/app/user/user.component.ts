import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  user: User;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
    console.log(this.user);
  }
}
