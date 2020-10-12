import {Component, ElementRef, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {EventFeedbackService} from './event-feedback.service';

@Component({
  selector: 'app-event-feedback',
  templateUrl: './event-feedback.component.html',
  styleUrls: ['./event-feedback.component.css']
})
export class EventFeedbackComponent implements OnInit {

  visible = false;
  @Output() closeModal = new Subject();
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalWrapper', {static: false}) modalWrapper: ElementRef;

  constructor(private eventFeedbackService: EventFeedbackService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.eventFeedbackService.eventFeedbackReceived.subscribe((data: any) => {
      console.log('EVENT ENDED');
      console.log(data);
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

  onSend() {
    console.log('sent');
  }

  onCloseModal() {
    this.visible = false;
  }
}
