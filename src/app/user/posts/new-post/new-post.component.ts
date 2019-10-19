import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input() user: User;
  imageToUpload: any = File;

  sharePostForm = this.fb.group({
    content: new FormControl(null),
    image: new FormControl(null)
  });

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
  }
  onFileChange(files: FileList) {
    this.imageToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.sharePostForm.get('image').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      });
    };
  }

  onCreatePost() {
    const content = this.sharePostForm.get('content').value;
    const image = this.sharePostForm.get('image').value;
    this.userService.createPost(content, image).subscribe((response) => {
          this.userService.addPost(response.post);
    });
    this.sharePostForm.reset();
  }
}
