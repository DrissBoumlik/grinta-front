import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {User} from '../../user.model';
import {UserService} from '../../user.service';
import {Page} from '../page/page.model';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  user: User;
  imageToUpload: any = File;

  CreatePageForm = this.fb.group({
    name: new FormControl('pageoss'),
    pagename: new FormControl('pageoss_user'),
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
      this.CreatePageForm.get('image').setValue({
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
      this.CreatePageForm.get('cover').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onCreatePage() {
    this.userService.createPage(this.CreatePageForm.value.name, this.CreatePageForm.value.pagename,
      this.CreatePageForm.value.image, this.CreatePageForm.value.cover,
      this.CreatePageForm.value.type, this.CreatePageForm.value.description)
      .subscribe((response: any) => console.log(response));
  }
}
