import {Component, OnInit, Output} from '@angular/core';
import {from, Subject} from 'rxjs';
import {RelationService} from '../../../friends/relation.service';
import {User} from '../../../user.model';
import {EventService} from '../../../../shared/event.service';
import {pluck} from 'rxjs/operators';
import {Event} from "../../event.model";
import {FeedbackService} from "../../../../shared/feedback/feedback.service";

@Component({
  selector: 'app-event-invitation',
  templateUrl: './event-invitation.component.html',
  styleUrls: ['./event-invitation.component.css']
})
export class EventInvitationComponent implements OnInit {
  event: Event;
  noRelations = false;
  relations: any[] = [];
  @Output() closeModal = new Subject();
  constructor(private relationService: RelationService,
              private feedbackService: FeedbackService,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.event = event;
    });
    this.event = this.eventService.event;
    this.onGetRelations();
  }

  onGetRelations() {
    this.relationService.getFriends().subscribe((response: any) => {
      this.relations = this.relationService.friends.filter((user) => {
        return !this.event.users.some((invitedUser) => user.uuid === invitedUser.uuid );
      });
      this.noRelations = !this.relations.length;
    });
  }

  onCloseModal() {
    this.closeModal.next(true);
  }

  onToggleUser(user: any) {
    user.chosen = !user.chosen;
  }

  onSend() {
    const usersUuids = this.relations.filter(user => user.chosen)
      .map(user => user.uuid);
    this.eventService.inviteUsers(usersUuids, this.event.uuid).subscribe(
      (response: any) => {
        this.eventService.getEventByUuid(response.event.uuid).subscribe((data: any) => {
          this.eventService.eventUpdated.next(data.event);
        });
        this.onGetRelations();
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      }
    );
  }
}
