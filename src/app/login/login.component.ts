import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../user/user.model';

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
  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if(userLogged)
      this.router.navigate(['/user']);
  }

  onLogin() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe((response: any) => {
      localStorage.setItem('_token', response.success.token);
      localStorage.setItem('_user', JSON.stringify(response.success.user));
      this.user = response.success.user;
      this.router.navigate(['user'], { relativeTo: this.route });
    });
  }
}
