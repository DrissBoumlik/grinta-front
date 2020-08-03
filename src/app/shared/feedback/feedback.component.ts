import {Component, OnInit} from '@angular/core';
import {FeedbackService} from './feedback.service';
import {ToolsService} from '../tools.service';
import {isObject} from 'util';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  flag: string;
  texts = [];

  constructor(private feedbackService: FeedbackService,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.feedbackService.feedbackReceived.subscribe(({feedback, message}: any) => {
      // this.flag = feedback;
      this.showFeedback(feedback, message);
    });
  }

  showFeedback(feedback: string, message: any) {
    console.log('feedback');
    // let text = null;
    this.flag = null;
    this.texts = [];
    if (Array.isArray(message)) {
      // let html = '<ul class="align-left m-0 p-0">';
      message.forEach((msg) => {
        // html += '<li>' + msg + '</li>';
        this.texts.push(msg);
      });
      // Swal.fire({
      //   html,
      //   icon: (SweetAlertIcon) feedback
      // });
      // text = html;
    } else if (isObject(message)) {
      message = Object.values(message);
      // let html = '<ul class="align-left">';
      message.forEach((msg) => {
        // html += '<li>' + msg[0] + '</li>';
        this.texts.push(msg[0]);
      });
      // text = html;
    } else {
      // Swal.fire({
      //   title: message,
      //   icon: (SweetAlertIcon) feedback
      // });
      // text = message;
      this.texts.push(message);
    }

    // this.text = text;
    this.flag = feedback;
    console.log(this.flag, this.texts);
  }

  onCloseAlert(textIndex) {
    this.texts = this.texts.filter((text, index) => {
        return index !== textIndex;
    });
    if (!this.texts.length) {
      this.flag = null;
    }
  }
}
