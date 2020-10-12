import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../user/user.model';
import {Router} from '@angular/router';
import Echo from 'laravel-echo';
import {EventFeedbackService} from '../event-feedback/event-feedback.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  notify = false;
  showNotifications = false;
  notifications: any[] = [];

  constructor(private authService: AuthService,
              private eventFeedbackService: EventFeedbackService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;

    this.setUpNotifications();

    // const token = localStorage.getItem('token');
    // const logged = (this.authService.user !== null && this.authService.user !== undefined) && (token !== undefined && token !== null);
    // if (logged) {
    //   this.user = this.authService.user;
    // } else {
    //   this.onLogout();
    // }
  }

  setUpNotifications() {
    this.notifications = JSON.parse(localStorage.getItem('notifications'));
    if (!this.notifications) {
      this.notifications = [];
    }
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
      .listen('.EventCreated', (e) => {
        this.notify = true;
        console.log(e.data);
        this.updateNotificationList(e.data);
      });
    channel = 'event.ended';
    echo.private(channel)
      .listen('.EventEnded', (e) => {
        this.notify = true;
        console.log(e.data);
        this.updateNotificationList(e.data);
        // this.eventFeedbackService.eventFeedbackReceived.next(e.data);
      });
  }

  updateNotificationList(data: any) {
    const offsetDate = this.timeDifference(new Date(), Date.parse(data.event.date));
    const notification = {
      event: data.event,
      user: data.user,
      text: data.text,
      image: data.user.picture,
      link: data.link,
      offsetDate
    };
    this.notifications.unshift(notification);
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  timeDifference(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
      return Math.round(elapsed / msPerHour ) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear ) + ' years ago';
    }
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
