import { Component, OnInit } from '@angular/core';
import {User} from '../../user/user.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {
  user: User | any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

}
