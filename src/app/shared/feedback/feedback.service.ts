import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class FeedbackService {
  feedbackReceived = new Subject<object>();
  constructor() { }
}
