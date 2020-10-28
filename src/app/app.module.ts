import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user.component';
import {HeaderComponent} from './shared/header/header.component';
import {AlbumComponent} from './user/albums/album/album.component';
import {MediaComponent} from './user/albums/album/medias/media/media.component';
import {AlbumsComponent} from './user/albums/albums.component';
import {MediasComponent} from './user/albums/album/medias/medias.component';

import {AuthService} from './auth/auth.service';
import {UserService} from './user/user.service';
import {ProfilePostsComponent} from './user/profile/profile-posts/profile-posts.component';
import {ProfileAlbumsComponent} from './user/profile/profile-media/profile-albums/profile-albums.component';
import {ProfileLikesComponent} from './user/profile/profile-likes/profile-likes.component';
import {HomeComponent} from './user/home/home.component';
import {ProfileService} from './user/profile/profile.service';
import {RegisterComponent} from './auth/register/register.component';
import {PostsModule} from './user/posts/posts.module';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {SharedModule} from './shared/shared.module';
import {PagesService} from './user/pages/pages.service';
import {FriendsModule} from './user/friends/friends.module';
import {ProfileEditComponent} from './user/profile/profile-edit/profile-edit.component';
import {NewPageComponent} from './user/pages/new-page/new-page.component';
import {PageComponent} from './user/pages/page/page.component';
import {PagesComponent} from './user/pages/pages.component';
import {PageItemComponent} from './user/pages/page-item/page-item.component';
import {PostWrapperComponent} from './user/posts/post-wrapper/post-wrapper.component';
import {TemplateComponent} from './user/template/template.component';
import {HandlerHttpInterceptor} from './handler/handler-http-interceptor';
import {DatePipe} from '@angular/common';
import {EventsModule} from './user/events/events.module';
import {SearchModule} from './search/search.module';
import {HelperService} from './helper.service';
import { ProfileAboutComponent } from './user/profile/profile-about/profile-about.component';
import { ProfileFriendsComponent } from './user/profile/profile-friends/profile-friends.component';
import { ProfilePhotosComponent } from './user/profile/profile-media/profile-photos/profile-photos.component';
import { ProfileHomeComponent } from './user/profile/profile-home/profile-home.component';
import { ProfileEventsComponent } from './user/profile/profile-events/profile-events.component';
import { ProfileEditInfoComponent } from './user/profile/profile-edit/profile-edit-info/profile-edit-info.component';
import { ProfileEditPasswordComponent } from './user/profile/profile-edit/profile-edit-password/profile-edit-password.component';
import { ProfileEditContactComponent } from './user/profile/profile-edit/profile-edit-contact/profile-edit-contact.component';
import { ProfileComponent } from './user/profile/profile/profile.component';
import { PageWrapperComponent } from './user/pages/page-wrapper/page-wrapper.component';
import { ProfileMediaComponent } from './user/profile/profile-media/profile-media.component';
import { ProfileVideosComponent } from './user/profile/profile-media/profile-videos/profile-videos.component';
import { NewAlbumComponent } from './user/profile/profile-media/new-album/new-album.component';
import { NewPhotoComponent } from './user/profile/profile-media/new-photo/new-photo.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('52047750060-bmip7boaqb1cehuhvd3ovq3cf7r21h4u.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
    return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AlbumComponent,
    MediaComponent,
    AlbumsComponent,
    MediasComponent,
    ProfilePostsComponent,
    ProfileAlbumsComponent,
    ProfileLikesComponent,
    HomeComponent,
    RegisterComponent,
    ProfileEditComponent,
    NewPageComponent,
    PageComponent,
    PagesComponent,
    PageItemComponent,
    PostWrapperComponent,
    TemplateComponent,
    ProfileAboutComponent,
    ProfileFriendsComponent,
    ProfilePhotosComponent,
    ProfileHomeComponent,
    ProfileEventsComponent,
    ProfileEditInfoComponent,
    ProfileEditPasswordComponent,
    ProfileEditContactComponent,
    ProfileComponent,
    PageWrapperComponent,
    ProfileMediaComponent,
    ProfileVideosComponent,
    NewAlbumComponent,
    NewPhotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    SharedModule,
    PostsModule,
    FriendsModule,
    EventsModule,
    SearchModule,
    SocialLoginModule
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    HeaderComponent,
    TemplateComponent,
  ],
  providers: [
    UserService,
    ProfileService,
    AuthService,
    PagesService,
    HelperService,
    DatePipe,
    {provide: AuthServiceConfig, useFactory: provideConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HandlerHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
