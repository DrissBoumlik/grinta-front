import { AuthService } from '../Auth/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.authService.isLogged(this.router);
    // let username = this.route.snapshot.params.username;
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      const username = params.username;
      this.profileService.getProfile(username).subscribe((response: any) => {
        this.profile = response.user;
        localStorage.setItem('_profile', JSON.stringify(this.profile));
      });
    });
  }
}
