import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MediaService} from '../../../../shared/media.service';
import {FeedbackService} from '../../../../shared/feedback/feedback.service';
import {User} from '../../../user.model';
import {ProfileService} from '../../profile.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {
  profile: User;
  mediaList: { src, type }[];
  private allowedTypes: string[];
  CreateAlbumForm = this.fb.group({
    name: new FormControl('eventoosss'),
    description: new FormControl('kokokokokosss'),
    medias: this.fb.array([]) // new FormArray([])
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

  get medias(): FormArray {
    return this.CreateAlbumForm.get('medias') as FormArray;
  }

  newFile(params): FormGroup {
    return this.fb.group(params);
  }

  onFileMediaChange(files: FileList) {
    // const file = files.item(0);

    // for (const file of files) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const type = file.type.split('/')[1];
      if (this.allowedTypes.includes(type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (data: any) => {
          const media = {src: data.target.result, type};
          this.mediaList.push(media);
          // Update form
          this.medias.push(this.newFile({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          }));
        };
      }
    }
  }

  onCreateAlbum() {
    const params = {
      name: this.CreateAlbumForm.value.name,
      description: this.CreateAlbumForm.value.description,
      medias: this.CreateAlbumForm.value.medias
    };
    this.mediaService.createAlbum(params)
      .subscribe((response: any) => {
        console.log(response);
        this.profile.albums = response.albums;
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
