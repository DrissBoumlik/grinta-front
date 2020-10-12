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
  flag = null;
  bgClassName: string;
  icon: string;
  texts = [];
  duration = 5000;

  constructor(private feedbackService: FeedbackService,
              private toolsService: ToolsService) {
  }

  ngOnInit() {
    this.feedbackService.feedbackReceived.subscribe(({feedback, message, duration}: any) => {
      // this.flag = feedback;
      if (duration) {
        this.duration = duration;
      }
      this.showFeedback(feedback, message);
    });
  }

  showFeedback(feedback: string, message: any) {
    this.flag = null;
    this.texts = [];
    if (Array.isArray(message)) {
      message.forEach((msg) => {
        this.texts.push(msg);
      });
    } else if (message.hasOwnProperty('error')) {
      this.texts.push(message.error);
    } else if (isObject(message)) {
      message = Object.values(message);
      message.forEach((msg) => {
        this.texts.push(msg[0]);
      });
    } else {
      this.texts.push(message);
    }

    this.flag = feedback;
    this.setFeedBackParams(feedback);
    setTimeout(() => {
      this.flag = null;
    }, this.duration);
  }

  setFeedBackParams(feedback: string) {
    switch (feedback) {
      case 'info':
        this.bgClassName = 'bg-primary';
        this.icon = 'ri-information-line';
        break;
      case 'success':
        this.bgClassName = 'bg-success';
        this.icon = 'ri-information-line';
        break;
      case 'warning':
        this.bgClassName = 'bg-warning';
        this.icon = 'ri-alert-line';
        break;
      case 'error':
        this.bgClassName = 'bg-danger';
        this.icon = 'ri-alert-line';
        break;
    }
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
