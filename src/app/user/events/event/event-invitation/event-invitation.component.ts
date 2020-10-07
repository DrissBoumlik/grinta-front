import {Component, ElementRef, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {from, Subject} from 'rxjs';
import {RelationService} from '../../../friends/relation.service';
import {User} from '../../../user.model';
import {EventService} from '../../../../shared/event.service';
import {pluck} from 'rxjs/operators';
import {Event as EventModel} from '../../event.model';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';

@Component({
  selector: 'app-event-invitation',
  templateUrl: './event-invitation.component.html',
  styleUrls: ['./event-invitation.component.css']
})
export class EventInvitationComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalWrapper', {static: false}) modalWrapper: ElementRef;
  event: EventModel;
  noRelations = false;
  relations: any[] = [];
  @Output() closeModal = new Subject();
  constructor(private relationService: RelationService,
              private feedbackService: FeedbackService,
              private renderer: Renderer2,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.eventLoaded.subscribe((event: EventModel) => {
      this.event = event;
    });
    this.event = this.eventService.event;
    this.onGetRelations();

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.modalWrapper && e.target !== this.modal.nativeElement && e.target === this.modalWrapper.nativeElement) {
        this.onCloseModal();
      }
    });
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
