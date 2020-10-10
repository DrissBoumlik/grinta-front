import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../user.model';

@Component({
  selector: 'app-posts-wrapper',
  templateUrl: './posts-wrapper.component.html',
  styleUrls: ['./posts-wrapper.component.css']
})
export class PostsWrapperComponent implements OnInit {

  authUser: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
  }

}
