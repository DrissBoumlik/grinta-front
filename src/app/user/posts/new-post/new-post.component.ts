import {FormBuilder, FormControl} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../user.model';
import {PostsService} from '../posts.service';
import {PageService} from '../../pages/page/page.service';
import {FeedbackService} from '../../../shared/feedback/feedback.service';

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

  constructor(private userService: UserService,
              private postsService: PostsService,
              private pageService: PageService,
              private feedbackService: FeedbackService,
              private fb: FormBuilder) {
  }

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
    const pageId = this.pageService.page ? this.pageService.page.id : null;
    this.postsService.createPost(content, image, pageId).subscribe((response: any) => {
      console.log('success');
      this.feedbackService.feedbackReceived.next({feedback: true, message: response.message});
      this.postsService.addPost(response.post);
    });
    this.sharePostForm.reset();
  }
}
