import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {FeedbackService} from '../../../shared/feedback/feedback.service';
import {SportService} from '../../../shared/sport.service';
import {Sport} from '../../sports/sport.model';
import {Event} from '../event.model';
import {EventService} from '../../../shared/event.service';
import {MapService} from '../../../shared/map.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  user: User;
  sports: Sport[] = [];
  imageToUpload: any = File;
  event: Event;
  editMode = false;
  srcCover: string | any;
  srcImage: string | any;
  slideStep = 10;
  transformCoverX = 0;
  transformCoverY = 0;
  CreateEventForm = this.fb.group({
    name: new FormControl(null),
    date: new FormControl(null),
    limit_signup: new FormControl(null),
    address: new FormControl(null),
    location: new FormControl(null),
    image: new FormControl(null),
    cover: new FormControl(null),
    type: new FormControl(null),
    description: new FormControl(null),
    sport: new FormControl(null, Validators.required)
  });

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private sportService: SportService,
              private eventService: EventService,
              private mapService: MapService,
              private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.sportService.getSports().subscribe((response: any) => {
      this.sports = response.sports;
    });

    this.mapService.adresseChosen.subscribe(((positionData: any) => {
      console.log(positionData);
      this.CreateEventForm.patchValue({
        address: positionData.label,
        location: positionData.y + ',' + positionData.x,
      });
    }));

    this.eventService.eventLoaded.subscribe((event: Event) => {
      this.event = event;
      this.initForm();
    });
    this.event = JSON.parse(localStorage.getItem('_event'));
    localStorage.removeItem('_event');
    // this.event = this.eventService.event;
    this.initForm();
  }

  initForm() {
    if (this.event) {
      this.editMode = true;
      this.CreateEventForm.patchValue({
        name: this.event.name,
        date: (new Date(this.event.date)).toISOString().substring(0, 16),
        limit_signup: (new Date(this.event.limit_signup)).toISOString().substring(0, 16),
        address: this.event.address,
        location: this.event.location,
        // image: this.event.image,
        // cover: this.event.cover,
        type: this.event.type,
        description: this.event.description,
        sport: this.event.sport_id
      });
    } else {
      console.log('init');
      const today = new Date();
      this.CreateEventForm.patchValue({
        // name: 'eventoosss',
        date: today.toISOString().substring(0, 16),
        limit_signup: today.toISOString().substring(0, 16),
        // address: 'Boulevard Massira',
        // location: '33.54568,-6.54689',
        // type: 'public',
        // description: 'kokokokokosss',
        // sport: 5,
      });
    }
  }

  onFileImageChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.srcImage = reader.result;
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
      this.srcCover = reader.result;
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
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }


  onUpdateEvent() {
    const event = {
      uuid: this.event.uuid,
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
    this.userService.updateEvent(event)
      .subscribe((response: any) => {
          console.log(response);
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }

  goToFinish() {
    console.log(this.CreateEventForm.value);
    // validation
    if (this.editMode) {
      this.onUpdateEvent();
    } else {
      this.onCreateEvent();
    }
  }

  slideImage(x = 0, y = 0) {
    this.transformCoverX += x;
    this.transformCoverY += y;
  }
}
