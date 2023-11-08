import {Component, OnInit} from '@angular/core';
import {User} from '../../../user.model';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';
import {ProfileService} from '../../profile.service';
import {MediaService} from '../../../../shared/media.service';

@Component({
  selector: 'app-new-photo',
  templateUrl: './new-photo.component.html',
  styleUrls: ['./new-photo.component.css']
})
export class NewPhotoComponent implements OnInit {
  profile: User | any;
  private allowedTypes: string[] = [];
  CreatePhotoForm = this.fb.group({
    medias: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              private profileService: ProfileService,
              private mediaService: MediaService) {
  }

  ngOnInit() {
    this.allowedTypes = ['jpg', 'jpeg', 'png', 'mp4'];

    this.profileService.profileLoaded.subscribe((profile: User) => {
      this.profile = profile;
    });
    this.profile = this.profileService.profile;
    console.clear();
  }

  get medias(): FormArray {
    return this.CreatePhotoForm.controls.medias as FormArray;
  }

  onFileMediaChange(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file: any | null = files.item(i);
      const type = file.type.split('/')[1];
      if (this.allowedTypes.includes(type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (data: any) => {
          // Make new FromGroup with empty
          const params = {
            src: data.target.result, type,
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            media: new FormControl({
              filename: file?.name,
              filetype: file?.type,
              value: reader.result
            })
          };
          this.medias.push(this.fb.group(params));
        };
      }
    }
  }

  onCreatePhoto() {
    const params = this.CreatePhotoForm.value?.medias?.map((mediaData: any) => {
      return {
        name: mediaData.name,
        description: mediaData.description,
        media: mediaData.media
      };
    });

    this.mediaService.createMedia({medias: params})
      .subscribe((response: any) => {
          console.log(response);
          this.profile.photos = response.photos;
          this.medias.clear();
          this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
        },
        (error: any) => {
          console.log(error);
          this.medias.clear();
          const message = error.error.errors ? error.error.errors : error.error.message;
          this.feedbackService.feedbackReceived.next({feedback: 'error', message});
        }
      );
  }

  onDelete(index: number) {
    this.medias.removeAt(index);
  }
}
