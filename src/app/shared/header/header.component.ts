import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../user/user.model';
import {Router} from '@angular/router';
import Echo from 'laravel-echo';
import {EventFeedbackService} from '../events/event-feedback/event-feedback.service';
import firebase from 'firebase';
import {ToolsService} from '../tools.service';
import {ProfileService} from '../../user/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | any;
  alertNewNotification = false;
  alertNewMessage = false;
  showNotifications = false;
  showChatList = false;
  notifications: any[] = [];
  newNotifications: any[] = [];
  emptyNotificationsList = false;
  emptyChatList = false;
  fbDB = firebase.database();
  chatDB = 'chats';
  chatList: any = [];
  newChatList: any = [];

  constructor(private authService: AuthService,
              private eventFeedbackService: EventFeedbackService,
              private toolService: ToolsService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.profileService.profileUpdated.subscribe((profile: User) => {
      this.user = profile;
      localStorage.setItem('profile', JSON.stringify(profile));
    });

    this.setUpNotifications();

    this.setupChatNotifications();

    // const token = localStorage.getItem('token');
    // const logged = (this.authService.user !== null && this.authService.user !== undefined) && (token !== undefined && token !== null);
    // if (logged) {
    //   this.user = this.authService.user;
    // } else {
    //   this.onLogout();
    // }
  }

  onShowChatList() {
    this.showChatList = !this.showChatList;
    this.alertNewMessage = false;
    if (this.showChatList) {
      this.newChatList = [];
      // this.notifications = this.notifications.map((notification) => {
      //   notification.seen = true;
      //   return notification;
      // });
      // localStorage.setItem('chatList', JSON.stringify(this.chatList));
    }
  }

  setupChatNotifications() {
    // this.chatList = JSON.parse(localStorage.getItem('chatList'));
    if (!this.chatList) {
      this.newChatList = [];
      this.chatList = [];
    }
    this.emptyChatList = !this.chatList.length;

    this.fbDB.ref(this.chatDB).on('value', (resp: any) => {
      const results = this.snapshotToArray(resp);
      this.chatList = results.chats;
      this.emptyChatList = !this.chatList.length;
    });
  }


  snapshotToArray(snapshot: any) {
    const returnArr: any = [];
    snapshot.forEach((childSnapshot: any) => {
      const items: any = Object.values(childSnapshot.val());
      const lastItem = items[items.length - 1];
      const offsetDate = this.toolService.timeDifference(new Date(), Date.parse(lastItem.date));
      let chat: any = {
        lastMsg: lastItem.message,
        dateMsg: lastItem.date,
        offsetDate, // lastItem.date
        details: {
          fromUsername: lastItem.fromUsername,
          toUsername: lastItem.toUsername
        }
      };
      if (this.user.username === lastItem.fromUsername) {
        chat = {
          username: lastItem.toUsername,
          firstname: lastItem.toFirstname,
          lastname: lastItem.toLastname,
          picture: lastItem.toPicture,
          ...chat,
        };
      } else {
        chat = {
          username: lastItem.fromUsername,
          firstname: lastItem.fromFirstname,
          lastname: lastItem.fromLastname,
          picture: lastItem.fromPicture,
          ...chat
        };
      }
      // const exists = this.chatList.some((chatItem) => {
      //   return chatItem.details.fromUsername === chat.details.fromUsername &&
      //     chatItem.details.toUsername === chat.details.toUsername &&
      //     chatItem.dateMsg === chat.dateMsg;
      // });
      // if (!exists) {
      if (this.user.username === lastItem.fromUsername || this.user.username === lastItem.toUsername) {
        this.newChatList.push(chat);
        returnArr.push(chat.username);
      }
      // }
    });
    // TODO: Update message instead of adding to the list if same conversation
    // this.alertNewMessage = !!this.newChatList.length;
    // if (this.newChatList.length && this.chatList.length) {
    //   this.alertNewMessage = !(this.newChatList[0].details.fromUsername === this.chatList[0].details.fromUsername &&
    //     this.newChatList[0].details.toUsername === this.chatList[0].details.toUsername &&
    //     this.newChatList[0].dateMsg === this.chatList[0].dateMsg);
    // }
    this.alertNewMessage = true;
    // this.chatList.unshift(...this.newChatList);
    this.newChatList = this.newChatList.sort((chatItem1: any, chatItem2: any) => {
      if (chatItem1.dateMsg > chatItem2.dateMsg) {
        return -1;
      }
      if (chatItem1.dateMsg < chatItem2.dateMsg) {
        return 1;
      }
      return 0;
    });
    this.newChatList = this.newChatList.slice(0, 5);
    return {userNames: returnArr, chats: this.newChatList};
  }

  setUpNotifications() {
    this.notifications = JSON.parse(localStorage.getItem('notifications') as string);
    if (!this.notifications) {
      this.notifications = this.newNotifications = [];
    }
    this.emptyNotificationsList = !this.notifications.length;
    this.alertNewNotification = this.notifications.some((notification) => {
      return !notification.seen;
    });
    this.updateNewNotifications();
    const token = localStorage.getItem('token');
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ':6001',
      auth: {headers: {Authorization: 'Bearer ' + token}}
    });
    let channel = '';
    channel = 'event.created';
    echo.private(channel)
      .listen('.EventCreated', (e: any) => {
        this.alertNewNotification = true;
        console.log(e.data);
        const data = {...e.data, seen: false};
        this.updateNotificationList(data);
      });
    channel = 'event.ended';
    echo.private(channel)
      .listen('.EventEnded', (e: any) => {
        this.alertNewNotification = true;
        console.log(e.data);
        const data = {...e.data, seen: false};
        this.updateNotificationList(data);
        this.eventFeedbackService.eventFeedbackReceived.next(e.data);
      });
    echo.connector.socket.on('connect', () => {
      localStorage.setItem('socketID', JSON.stringify(echo.socketId()));
    });
  }

  updateNewNotifications() {
    this.newNotifications = this.notifications.filter((notification) => {
      return !notification.seen;
    });
  }

  updateNotificationList(data: any) {
    const offsetDate = this.toolService.timeDifference(new Date(), Date.parse(data.event.created_at));
    const notification = {
      event: data.event,
      user: data.user,
      text: data.text,
      image: data.user.picture,
      link: data.link,
      offsetDate,
      seen: false
    };
    this.notifications.unshift(notification);
    this.newNotifications.unshift(notification);

    this.notifications = this.notifications.slice(0, 5);
    this.emptyNotificationsList = !this.notifications.length;
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  onLogout() {
    this.authService.logout()
      .subscribe((response: any) => {
      this.router.navigate(['/login']);
    });
  }

  onShowNotifications() {
    this.showNotifications = !this.showNotifications;
    this.alertNewNotification = false;
    if (this.showNotifications) {
      this.newNotifications = [];
      this.notifications = this.notifications.map((notification) => {
        notification.seen = true;
        return notification;
      });
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }
  }
}
