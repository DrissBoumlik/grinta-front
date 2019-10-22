import {NgModule} from '@angular/core';
import {PostComponent} from './post/post.component';
import {PostsComponent} from './posts.component';
import {NewPostComponent} from './new-post/new-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommentComponent} from './post/comments/comment/comment.component';
import {ReplyComponent} from './post/comments/comment/reply/reply.component';
import {CommentsComponent} from './post/comments/comments.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PostsService} from './posts.service';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    NewPostComponent,
    CommentsComponent,
    CommentComponent,
    ReplyComponent,
  ],
  exports: [
    PostComponent,
    PostsComponent,
    NewPostComponent,
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule, InfiniteScrollModule],
  providers: [PostsService]
})
export class PostsModule {

}
