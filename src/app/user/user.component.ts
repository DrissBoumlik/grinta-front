import { LoginService } from './../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user: User;
  constructor(private userService: UserService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) {
                // this.user = this.loginService.user;
  }

  ngOnInit() {
    this.loginService.isLogged(this.router);
    let username = this.route.snapshot.params['username'];
    this.userService.getProfile(username).subscribe((response: any) => {
      this.user = response.user;
    });
  }
}
