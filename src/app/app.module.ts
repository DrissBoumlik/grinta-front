import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './user/posts/post/post.component';
import { FriendComponent } from './user/friends/friend/friend.component';
import { FriendsComponent } from './user/friends/friends.component';
import { PostsComponent } from './user/posts/posts.component';
import { NewPostComponent } from './user/posts/new-post/new-post.component';
import { CommentsComponent } from './user/posts/post/comments/comments.component';
import { CommentComponent } from './user/posts/post/comments/comment/comment.component';
import { AlbumComponent } from './user/albums/album/album.component';
import { MediaComponent } from './user/albums/album/medias/media/media.component';
import { AlbumsComponent } from './user/albums/albums.component';
import { MediasComponent } from './user/albums/album/medias/medias.component';
import { NewPageComponent } from './user/pages/new-page/new-page.component';
import { PageComponent } from './user/pages/page/page.component';
import { EventsComponent } from './user/events/events.component';
import { PagesComponent } from './user/pages/pages.component';
import { NewEventComponent } from './user/events/new-event/new-event.component';
import { EventComponent } from './user/events/event/event.component';
import { ReplyComponent } from './user/posts/post/comments/comment/reply/reply.component';

import {LoginService} from './login/login.service';
import { UserService } from './user/user.service';
import { ErrorService } from './shared/error.service';
import { UserPostsComponent } from './user/profile/userposts/userposts.component';
import { UserMediasComponent } from './user/profile/usermedias/usermedias.component';
import { UserLikesComponent } from './user/profile/userlikes/userlikes.component';
import { HomeComponent } from './user/home/home.component';
import {ProfileService} from './user/profile/profile.service';
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
    AlbumComponent,
    MediaComponent,
    AlbumsComponent,
    MediasComponent,
    NewPageComponent,
    PageComponent,
    EventsComponent,
    PagesComponent,
    NewEventComponent,
    EventComponent,
    ReplyComponent,
    UserPostsComponent,
    UserMediasComponent,
    UserLikesComponent,
    HomeComponent,
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
  providers: [UserService, ProfileService, LoginService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
