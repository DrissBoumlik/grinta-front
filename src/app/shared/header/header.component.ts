import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../user/user.model';
import {Router} from '@angular/router';

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
    this.user = this.authService.user;
    // const token = localStorage.getItem('token');
    // const logged = (this.authService.user !== null && this.authService.user !== undefined) && (token !== undefined && token !== null);
    // if (logged) {
    //   this.user = this.authService.user;
    // } else {
    //   this.onLogout();
    // }
  }
  onLogout() {
    this.authService.logout().subscribe((response: any) => {
      this.router.navigate(['/']);
    });
  }

}
