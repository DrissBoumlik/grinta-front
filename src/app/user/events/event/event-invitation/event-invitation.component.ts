import {Component, ElementRef, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {RelationService} from '../../../friends/relation.service';
import {EventService} from '../../../../shared/event.service';
import {Event as EventModel} from '../../event.model';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';
import {User} from '../../../user.model';

@Component({
  selector: 'app-event-invitation',
  templateUrl: './event-invitation.component.html',
  styleUrls: ['./event-invitation.component.css']
})
export class EventInvitationComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: ElementRef | any;
  @ViewChild('modalWrapper', {static: false}) modalWrapper: ElementRef | any;
  event: EventModel | any;
  relations: (User | any)[] = [];
  sendRequest: any = null;
  searchTerm = '';
  queryPage: number = 1;
  loadingData = true;
  stopLoadingMore = true;
  @Output() closeModal = new Subject();
  emptyResults = false;
  constructor(private relationService: RelationService,
              private feedbackService: FeedbackService,
              private renderer: Renderer2,
              private eventService: EventService) { }

  ngOnInit() {
    this.queryPage = 1;
    this.eventService.eventLoaded.subscribe((event: EventModel) => {
      this.event = event;
    });
    this.event = this.eventService.event;
    const params = {page: this.queryPage, searchTerm: this.searchTerm, uuid: this.event.uuid};
    this.onGetRelations(params);

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.modal.nativeElement && e.target === this.modalWrapper.nativeElement) {
        this.onCloseModal();
      }
    });
  }

  onGetRelations(params = {page: 1, searchTerm: '', uuid: ''}) {
    this.loadingData = true;
    this.emptyResults = false;
    params = {...{uuid: this.event.uuid}, ...params};
    this.relationService.getRelations(params).subscribe((response: any) => {
      // this.relations = this.relationService.relations.filter((user) => {
      //   return !this.event.users.some((invitedUser) => user.uuid === invitedUser.uuid );
      // });
      this.relations = this.relationService.relations;
      this.emptyResults = !response.relations.length && this.queryPage === 1;
      this.stopLoadingMore = !response.relations.length && this.queryPage > 1;
      this.loadingData = false;
    });
  }

  onCloseModal() {
    this.closeModal.next(true);
  }

  onToggleChooseUser(user: any) {
    user.chosen = !user.chosen;
  }

  onSend() {
    const usersUuids = this.relations.filter(user => user.chosen)
      .map(user => user.uuid);

    const invitationsLeft = this.event.limit_invitations - this.event.users.length;
    if (invitationsLeft < usersUuids.length) {
      this.feedbackService.feedbackReceived.next({feedback: 'warning', message: `You only have ${invitationsLeft} people to invite !`});
      return;
    }

    if (usersUuids.length) {
      this.eventService.inviteUsers(usersUuids, this.event.uuid).subscribe(
        (response: any) => {
          this.eventService.getEventByUuid(response.event.uuid).subscribe((data: any) => {
            this.eventService.eventUpdated.next(data.event);
          });
          this.queryPage = 1;
          const params = {page: this.queryPage, searchTerm: this.searchTerm, uuid: this.event.uuid};
          this.onGetRelations(params);
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        }, (error: any) => {
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
    } else {
      this.feedbackService.feedbackReceived.next({feedback: 'warning', message: 'Aucun utilisateur n\'a été selectionné'});
    }
  }

  onSearch(value: any) {
    this.queryPage = 1;
    this.relations = [];
    this.emptyResults = true;
    this.searchTerm = value;
    clearTimeout(this.sendRequest);
    this.sendRequest = setTimeout(() => {
      const params = {page: this.queryPage, searchTerm: this.searchTerm, uuid: this.event.uuid};
      this.onGetRelations(params);
    }, 500);
  }

  onLoadMore() {
    if (!this.stopLoadingMore) {
      const params = {page: ++this.queryPage, searchTerm: this.searchTerm, uuid: this.event.uuid};
      this.onGetRelations(params);
    }
  }
}
