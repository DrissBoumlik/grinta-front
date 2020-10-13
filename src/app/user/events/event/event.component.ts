import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventService} from '../../../shared/event.service';
import {User} from '../../user.model';
import {Event} from '../event.model';
import {AuthService} from '../../../auth/auth.service';
import {FeedbackService} from '../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  authUser: User;
  user: User;
  event: Event;
  showInvitationModal = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private eventService: EventService) { }

  ngOnInit() {
    this.authUser = this.authService.user;
    let uuid = this.route.snapshot.params.uuid;
    this.onGetEvent(uuid);
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      uuid = params.uuid;
      this.onGetEvent(uuid);
    });
    this.eventService.eventUpdated.subscribe((event: Event) => {
      this.event = event;
    });
    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.event = event;
    });
  }

  onGetEvent(uuid: string) {
    this.eventService.getEventByUuid(uuid).subscribe((response: any) => {
      this.event = response.event;
      this.user = response.event.user;
    });
  }

  onInvite() {
    this.showInvitationModal = true;
  }

  onParticipate() {
    const usersUuids = [this.authUser.uuid];
    this.eventService.inviteUsers(usersUuids, this.event.uuid).subscribe(
      (response: any) => {
        this.eventService.getEventByUuid(response.event.uuid).subscribe((data: any) => {
          this.eventService.eventUpdated.next(data.event);
        });
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      }
    );
  }

  onCloseModal(value: boolean) {
    this.showInvitationModal = false;
  }
}
