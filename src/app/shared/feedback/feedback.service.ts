import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackReceived = new Subject<object>();
  constructor() { }
}
