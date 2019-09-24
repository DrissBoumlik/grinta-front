import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login();
    this.router.navigate(['/user']);
  }
}
