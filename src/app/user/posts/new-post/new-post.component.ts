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
  @Input() user: User | any;
  mediaToUpload: any = File;
  srcMedia: any = null;
  mediaType: any = null;

  sharePostForm: any = this.fb.group({
    body: new FormControl(null),
    media: new FormControl(null)
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
    const file = this.mediaToUpload = files.item(0);
    this.mediaType = file?.type.split('/')[1];
    const reader = new FileReader();
    reader.readAsDataURL(this.mediaToUpload);
    reader.onload = (data) => {
      this.srcMedia = reader.result;
      this.sharePostForm.get('media').setValue({
        filename: this.mediaToUpload.name,
        filetype: this.mediaToUpload.type,
        value: reader.result
      });
    };
  }

  onCreatePost() {
    const body = this.sharePostForm.get('body').value;
    const media = this.sharePostForm.get('media').value;
    const pageId = this.pageService.page ? this.pageService.page.id : null;
    this.postsService.createPost({body, media, page_id: pageId}).subscribe((response: any) => {
      console.log('success');
      this.feedbackService.feedbackReceived.next({feedback: 'success', message: response.message});
      this.postsService.addPost(response.post);
    });
    this.sharePostForm.reset();
    this.srcMedia = null;
  }
}
