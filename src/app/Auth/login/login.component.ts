import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm = new FormGroup({
    username: new FormControl('a@a.a', Validators.required),
    password: new FormControl('123123123', Validators.required)
  });
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if (userLogged) {
      this.router.navigate(['home']);
    }
  }

  onLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((response: any) => {
      this.user = this.authService.user = response.success.user;
      this.router.navigate(['home']);
    });
  }
}
