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
import {PageService} from '../pages/page/page.service';
import {SharedModule} from '../../shared/shared.module';
import { PostsWrapperComponent } from './posts-wrapper/posts-wrapper.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    NewPostComponent,
    CommentsComponent,
    CommentComponent,
    ReplyComponent,
    PostsWrapperComponent,
  ],
  exports: [
    PostComponent,
    PostsComponent,
    NewPostComponent,
    CommentsComponent,
    CommentComponent,
    ReplyComponent,
    PostsWrapperComponent,
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule, InfiniteScrollModule, SharedModule],
  providers: [PostsService, PageService]
})
export class PostsModule {

}
