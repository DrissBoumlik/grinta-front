import { CommentService } from './user/posts/post/comments/comment.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {LoginService} from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { PostService } from './user/posts/post/post.service';
import { PostComponent } from './user/posts/post/post.component';
import { FriendComponent } from './user/friends/friend/friend.component';
import { FriendsComponent } from './user/friends/friends.component';
import { PostsComponent } from './user/posts/posts.component';
import { NewPostComponent } from './user/posts/new-post/new-post.component';
import { CommentsComponent } from './user/posts/post/comments/comments.component';
import { CommentComponent } from './user/posts/post/comments/comment/comment.component';
import { UserService } from './user/user.service';
import { ErrorService } from './shared/error.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    PostComponent,
    FriendComponent,
    FriendsComponent,
    PostsComponent,
    NewPostComponent,
    CommentsComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule
  ],
  providers: [UserService, LoginService, PostService, CommentService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
