import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { PostService } from '../post/post.service';
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

  constructor(private postService: PostService, private fb: FormBuilder) {}

  ngOnInit() {
  }
  onFileChange(files: FileList) {
    this.imageToUpload = files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = (data) => {
      this.sharePostForm.get('image').setValue({
        filename: this.imageToUpload.name,
        filetype: this.imageToUpload.type,
        value: reader.result
      })
    };
    console.log(this.sharePostForm.get('image').value);
  }

  onSharePost() {
    let content = this.sharePostForm.get('content').value;
    let image = this.sharePostForm.get('image').value;
    this.postService.createPost(content, image).subscribe((response) => {
          this.postService.addPost(response.post);
    });
    this.sharePostForm.reset();
  }
}
