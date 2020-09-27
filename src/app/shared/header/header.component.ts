import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../user/user.model';
import {Router} from '@angular/router';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  notify = false;
  showNotifications = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;
    const token = localStorage.getItem('token');
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ':6001',
      auth: {headers: {Authorization: 'Bearer ' + token}}
    });
    localStorage.setItem('socketID', JSON.stringify(echo.socketId()));
    // console.log(echo.socketId());
    let channel = '';
    channel = 'event.created';
    echo.private(channel)
      .listen('.Event', (e) => {
        this.notify = true;
        console.log(e);
      });

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

  onShowNotifications() {
    this.showNotifications = !this.showNotifications;
    this.notify = false;
  }
}
