import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {FeedbackService} from '../../../shared/feedback/feedback.service';
import {SportService} from '../../../shared/sport.service';
import {Sport} from '../../sports/sport.model';
import {Event} from '../event.model';
import {EventService} from '../../../shared/event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  user: User;
  sports: Sport[] = [];
  imageToUpload: any = File;
  steps = {
    infos: {active: true, done: false},
    details: {active: false, done: false},
    media: {active: false, done: false},
    finish: {active: false, done: false},
  };
  event: Event;

  CreateEventForm = this.fb.group({
    name: new FormControl('eventoosss'),
    date: new FormControl(new Date().toISOString().slice(0, -14)),
    limit_signup: new FormControl(new Date().toISOString().substring(0, 10)),
    address: new FormControl('event address'),
    location: new FormControl('event location'),
    image: new FormControl(null),
    cover: new FormControl(null),
    type: new FormControl('public'),
    description: new FormControl('kokokokokosss'),
    sport: new FormControl(1, Validators.required)
  });

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private sportService: SportService,
              private eventService: EventService,
              private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });

    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.event = event;
      this.initForm();
    });
    this.event = this.eventService.event;
    this.initForm();
  }

  initForm() {
    this.CreateEventForm.patchValue({
      name: this.event.name,
      date: this.event.date.split(' ')[0],
      limit_signup: this.event.limit_signup.split(' ')[0],
      address: this.event.address,
      location: this.event.location,
      // image: this.event.image,
      // cover: this.event.cover,
      type: this.event.type,
      description: this.event.description,
      sport: this.event.sport_id
    });
  }

  onFileImageChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.CreateEventForm.get('image').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onFileCoverChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.CreateEventForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onCreateEvent() {
    const event = {
      name: this.CreateEventForm.value.name,
      date: this.CreateEventForm.value.date,
      limit_signup: this.CreateEventForm.value.limit_signup,
      address: this.CreateEventForm.value.address,
      location: this.CreateEventForm.value.location,
      image: this.CreateEventForm.value.image,
      cover: this.CreateEventForm.value.cover,
      type: this.CreateEventForm.value.type,
      description: this.CreateEventForm.value.description,
      sport_id: this.CreateEventForm.value.sport
    };
    this.userService.createEvent(event)
      .subscribe((response: any) => {
          console.log(response);
          this.steps = {
            infos: {active: false, done: true},
            details: {active: false, done: true},
            media: {active: true, done: true},
            finish: {active: true, done: true},
          };
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }


  goToInfos() {
    this.steps = {
      infos: {active: true, done: false},
      details: {active: false, done: false},
      media: {active: false, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.infos);
  }

  goToDetails() {
    // validation
    // branching
    this.steps = {
      infos: {active: false, done: true},
      details: {active: true, done: false},
      media: {active: false, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.details);
  }

  goToMedia() {
    // validation
    // branching
    this.steps = {
      infos: {active: false, done: true},
      details: {active: false, done: true},
      media: {active: true, done: false},
      finish: {active: false, done: false},
    };
    console.log(this.steps.media);
  }

  goToFinish() {
    // validation
    // branching
    // this.steps = {
    //   infos: {active: false, done: true},
    //   details: {active: false, done: true},
    //   media: {active: false, done: true},
    //   finish: {active: true, done: false},
    // };
    // console.log(this.steps.finish);
    this.onCreateEvent();

  }

}
