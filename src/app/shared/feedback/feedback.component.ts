import {Component, OnInit} from '@angular/core';
import {FeedbackService} from './feedback.service';
import {ToolsService} from '../tools.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  success: boolean;

  constructor(private feedbackService: FeedbackService,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.feedbackService.feedbackReceived.subscribe(({feedback, message}: any) => {
      this.success = feedback;
      this.showFeedback(feedback, message);
    });
  }

  showFeedback(feedback: boolean, message: string) {
    console.log('feedback');
    if (Array.isArray(message)) {
      let html = '<ul class="align-left">';
      message.forEach((msg) => {
        html += '<li>' + msg + '</li>';
      });
      Swal.fire({
        html,
        icon: feedback ? 'success' : 'error'
      });
    } else {
      Swal.fire({
        title: message,
        icon: feedback ? 'success' : 'error'
      });
    }
  }
}
