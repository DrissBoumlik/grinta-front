import {Component, ElementRef, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {RelationService} from '../../../friends/relation.service';
import {EventService} from '../../../../shared/event.service';
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
  relations: any[] = [];
  sendRequest = null;
  searchTerm = '';
  queryPage: number;
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
    this.onGetRelations();

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.modalWrapper && e.target !== this.modal.nativeElement && e.target === this.modalWrapper.nativeElement) {
        this.onCloseModal();
      }
    });
  }

  onGetRelations(page = 1, searchTerm = '') {
    this.loadingData = true;
    this.emptyResults = false;
    this.relationService.getRelations(page, searchTerm).subscribe((response: any) => {
      this.relations = this.relationService.relations.filter((user) => {
        return !this.event.users.some((invitedUser) => user.uuid === invitedUser.uuid );
      });
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
    this.eventService.inviteUsers(usersUuids, this.event.uuid).subscribe(
      (response: any) => {
        this.eventService.getEventByUuid(response.event.uuid).subscribe((data: any) => {
          this.eventService.eventUpdated.next(data.event);
        });
        this.queryPage = 1;
        this.onGetRelations(this.queryPage, this.searchTerm);
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      }, (error: any) => {
        const message = error.error.errors ? error.error.errors : error.error.message;
        this.feedbackService.feedbackReceived.next({feedback: 'error', message});
      }
    );
  }

  onSearch(value: any) {
    this.queryPage = 1;
    this.searchTerm = value;
    clearTimeout(this.sendRequest);
    this.sendRequest = setTimeout(() => {
      this.onGetRelations(this.queryPage, this.searchTerm);
    }, 500);
  }

  onLoadMore() {
    if (!this.stopLoadingMore) {
      this.onGetRelations(++this.queryPage, this.searchTerm);
    }
  }
}
