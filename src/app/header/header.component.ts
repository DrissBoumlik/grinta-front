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
  username: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  //* TODO: Responsive styles for Header
  ngOnInit() {
    let logged = localStorage.getItem('_user') !== null && localStorage.getItem('_user') !== undefined;
    if(logged) {
      let user = JSON.parse(localStorage.getItem('_user')) as User;
      this.userImage = user.picture;
      this.username = user.name;
    }
    this.searchForm = new FormGroup({
      q: new FormControl(null)
    });
  }
  onLogout() {
    this.loginService.logout().subscribe((response: any) => {
      console.log(response);
    });
  }

  onSearch() {

  }
}
