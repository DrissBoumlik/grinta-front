import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../Auth/auth.service';
import {Router} from '@angular/router';
import { User } from '../../user/user.model';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('_token');
    const logged = (this.authService.user !== null && this.authService.user !== undefined) && (token !== undefined && token !== null);
    if (logged) {
      this.user = this.authService.user;
    } else {
      this.onLogout();
    }
  }
  onLogout() {
    this.authService.logout().subscribe((response: any) => {
      this.router.navigate(['/']);
      // window.location.href = '/';
    });
  }

}
