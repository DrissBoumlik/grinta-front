import { Component, OnInit } from '@angular/core';
import {User} from '../../user.model';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  user: User;
  imageToUpload: any = File;

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
  });

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
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
    this.userService.createEvent(this.CreateEventForm.value.name,
      this.CreateEventForm.value.date, this.CreateEventForm.value.limit_signup,
      this.CreateEventForm.value.address, this.CreateEventForm.value.location,
      this.CreateEventForm.value.image, this.CreateEventForm.value.cover,
      this.CreateEventForm.value.type, this.CreateEventForm.value.description)
      .subscribe((response: any) => console.log(response));
  }

}
