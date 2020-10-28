import {Component, OnInit} from '@angular/core';
import {User} from '../../../user.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';
import {ProfileService} from '../../profile.service';
import {MediaService} from '../../../../shared/media.service';

@Component({
  selector: 'app-new-photo',
  templateUrl: './new-photo.component.html',
  styleUrls: ['./new-photo.component.css']
})
export class NewPhotoComponent implements OnInit {
  profile: User;
  mediaList: { src, type }[];
  private allowedTypes: string[];
  CreatePhotoForm = this.fb.group({
    name: new FormControl('eventoosss'),
    description: new FormControl('kokokokokosss'),
    media: new FormControl(null)
  });

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private profileService: ProfileService,
              private mediaService: MediaService) {
  }

  ngOnInit() {
    this.allowedTypes = ['jpg', 'jpeg', 'png', 'mp4'];
    this.mediaList = [];

    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
    console.clear();
  }

  onFileMediaChange(files: FileList) {
    const file = files.item(0);
    const type = file.type.split('/')[1];
    if (this.allowedTypes.includes(type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (data: any) => {
        const media = {src: data.target.result, type};
        if (this.mediaList.length) {
          this.mediaList[0] = media;
        } else {
          this.mediaList.push(media);
        }
        this.CreatePhotoForm.get('media').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result
        });
      };
    }
  }

  onCreatePhoto() {
    const params = {
      name: this.CreatePhotoForm.value.name,
      description: this.CreatePhotoForm.value.description,
      media: this.CreatePhotoForm.value.media
    };
    console.log(params);
    this.mediaService.createPhotos(params)
      .subscribe((response: any) => {
          console.log(response);
          this.profile.photos = response.photos;
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }
}
