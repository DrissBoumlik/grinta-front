import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './shared/header/header.component';
import { AlbumComponent } from './user/albums/album/album.component';
import { MediaComponent } from './user/albums/album/medias/media/media.component';
import { AlbumsComponent } from './user/albums/albums.component';
import { MediasComponent } from './user/albums/album/medias/medias.component';
import { EventsComponent } from './user/events/events.component';
import { NewEventComponent } from './user/events/new-event/new-event.component';
import { EventComponent } from './user/events/event/event.component';

import {AuthService} from './Auth/auth.service';
import { UserService } from './user/user.service';
import { UserPostsComponent } from './user/profile/user-posts/user-posts.component';
import { UserAlbumsComponent } from './user/profile/user-albums/user-albums.component';
import { UserLikesComponent } from './user/profile/user-likes/user-likes.component';
import { HomeComponent } from './user/home/home.component';
import {ProfileService} from './user/profile/profile.service';
import { RegisterComponent } from './Auth/register/register.component';
import {PostsModule} from './user/posts/posts.module';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {SharedModule} from './shared/shared.module';
import {PagesService} from './user/pages/pages.service';
import {FriendsModule} from './user/friends/friends.module';
import {EditUserComponent} from './user/profile/edit-user/edit-user.component';
import { UserOptionsComponent } from './user/user-options/user-options.component';
import { UserUpdatesComponent } from './user/user-updates/user-updates.component';
import {NewPageComponent} from './user/pages/new-page/new-page.component';
import {PageComponent} from './user/pages/page/page.component';
import {PagesComponent} from './user/pages/pages.component';
import {PageItemComponent} from './user/pages/page-item/page-item.component';

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
    EventsComponent,
    NewEventComponent,
    EventComponent,
    UserPostsComponent,
    UserAlbumsComponent,
    UserLikesComponent,
    HomeComponent,
    RegisterComponent,
    EditUserComponent,
    UserOptionsComponent,
    UserUpdatesComponent,
    NewPageComponent,
    PageComponent,
    PagesComponent,
    PageItemComponent,
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
    SocialLoginModule
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  providers: [
    UserService,
    ProfileService,
    AuthService,
    PagesService,
    {provide: AuthServiceConfig,
      useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
