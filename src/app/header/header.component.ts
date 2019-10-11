import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  userImage: string;
  firstname: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    // let logged = localStorage.getItem('_user') !== null && localStorage.getItem('_user') !== undefined;
    let logged = this.loginService.user !== null && this.loginService.user !== undefined;
    if(logged) {
      this.userImage = this.loginService.user.picture;
      this.firstname = this.loginService.user.firstname;
    }
    this.searchForm = new FormGroup({
      q: new FormControl(null)
    });
  }
  onLogout() {
    this.loginService.logout().subscribe((response: any) => {
      this.router.navigate(['/']);
    });
  }

  onSearch() {

  }
}
