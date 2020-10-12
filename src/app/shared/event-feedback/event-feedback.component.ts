import {Component, ElementRef, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {EventFeedbackService} from './event-feedback.service';
import {Event as EventModel} from '../../user/events/event.model';
import {FeedbackService} from '../feedback/feedback.service';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css']
})
export class EventFeedbackComponent implements OnInit {

  event: EventModel;
  visible = false;
  @Output() closeModal = new Subject();
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalWrapper', {static: false}) modalWrapper: ElementRef;

  constructor(private eventFeedbackService: EventFeedbackService,
              private feedbackService: FeedbackService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.eventFeedbackService.eventFeedbackReceived.subscribe((data: any) => {
      console.log(data);
      this.event = data.event;
      this.showFeedback();
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.modalWrapper && e.target !== this.modal.nativeElement && e.target === this.modalWrapper.nativeElement) {
        this.onCloseModal();
      }
    });
  }


  showFeedback() {
    this.visible = true;
  }

  onSend(participated: number) {
    this.eventFeedbackService.sendFeedback(participated).subscribe(
      (response: any) => {
        console.log(response);
        this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message, duration: 7000});
        this.onCloseModal();
      }
    );
  }

  onCloseModal() {
    this.visible = false;
  }
}
