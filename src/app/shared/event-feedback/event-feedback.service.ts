import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventFeedbackService {

  eventFeedbackReceived = new Subject<object>();
  constructor() { }
}
