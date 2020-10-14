import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Event} from '../../../user/events/event.model';
import {User} from '../../../user/user.model';
import {AuthService} from '../../../auth/auth.service';
import {EventService} from '../../event.service';
import {EventFeedbackService} from '../event-feedback/event-feedback.service';
import {FeedbackService} from '../../feedback/feedback.service';

@Component({
  selector: 'app-event-review',
  templateUrl: './event-review.component.html',
  styleUrls: ['./event-review.component.css']
})
export class EventReviewComponent implements OnInit {
  authUser: User;
  user: User;
  participants: (User | any)[];
  event: Event;
  loadingData = true;
  emptyList = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private eventFeedbackService: EventFeedbackService,
              private eventService: EventService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    let uuid = this.route.snapshot.params.uuid;
    if (uuid) {
      this.onGetEvent(uuid);
      this.route.params.subscribe((params: Params) => {
        window.scroll(0, 0);
        uuid = params.uuid;
        this.onGetEvent(uuid);
      });
    } else {
      this.onInitProperties(this.eventService.event);
    }
    this.eventService.eventUpdated.subscribe((event: Event) => {
      this.onInitProperties(event);
    });
    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.onInitProperties(event);
    });
  }

  onInitProperties(event) {
    this.loadingData = false;
    this.event = event;
    this.user = this.event.user;
    this.participants = this.event.users;
    this.emptyList = !this.participants.length;
  }

  onGetEvent(uuid: string) {
    this.participants = [];
    this.loadingData = true;
    this.eventService.getEventByUuid(uuid).subscribe((response: any) => {
      this.onInitProperties(response.event);
    });
  }

  onNoteUserBehavior(user: User | any, value: number) {
    this.onNoteUser(user, value, 'behavior');
  }

  onNoteUserPerformance(user: User | any, value: number) {
    this.onNoteUser(user, value, 'performance');
  }

  onNoteUser(user: User | any, value: number, type: string) {
    const note = {};
    note[type] = value;
    if (user.note) {
      user.note = {...user.note, ...note};
    } else {
      user.note = {...note};
    }
  }

  onSend() {
    const notedUsers = this.participants.filter(user => {
      const notes = [-2, 0, 1];
      if (user.note) {
        return notes.includes(user.note.behavior) || notes.includes(user.note.performance);
      }
    });
    if (notedUsers.length) {
      this.eventFeedbackService.noteUsers(notedUsers, this.event.uuid).subscribe(
        (response: any) => {
          console.log(response);
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        }, (error: any) => {
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
    } else {
      this.feedbackService.feedbackReceived.next({feedback: 'warning', message: 'Aucun utilisateur n\'a été selectionné'});
    }
    // SEND REQUEST FOR NOTATION
  }
}
