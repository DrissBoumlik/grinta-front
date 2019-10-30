import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../user/user.model';

import {GoogleLoginProvider, AuthService as SocialService, SocialUser} from 'angularx-social-login';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  private socialUser: SocialUser;
  private loggedIn: boolean;

  loginForm = new FormGroup({
    username: new FormControl('a@a.a', Validators.required),
    password: new FormControl('123123123', Validators.required)
  });
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private socialService: SocialService) { }

  ngOnInit() {
    const userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
    }

    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
      console.log(user);
    });
  }

  onLogin() {
    this.authService.login(false, this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((response: any) => {
      this.user = this.authService.user = response.success.user;
      this.router.navigate(['home']);
    });
  }
  signInWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        console.log(socialUser);
        this.authService.login(true, socialUser.name, null)
          .subscribe((response2: any) => {
            this.userService.user = this.authService.user = response2.success.user;
            this.router.navigate(['home']);
          });
      });
  }


  signOut(): void {
    this.socialService.signOut();
  }
}
