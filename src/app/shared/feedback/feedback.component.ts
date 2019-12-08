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
      this.showFeedback(feedback ? 'success' : 'error', message);
    });
  }

  showFeedback(feedback: string, message: string) {
    console.log('feedback');

    // Swal.fire('Hello world!');
    // @ts-ignore
    Swal.fire(
      '',
      message,
      feedback ? 'success' : 'error'
    );
  }
}
