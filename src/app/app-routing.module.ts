import {NewEventComponent} from './user/events/new-event/new-event.component';
import {NewPageComponent} from './user/pages/new-page/new-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user.component';
import {UserPostsComponent} from './user/profile/user-posts/user-posts.component';
import {UserAlbumsComponent} from './user/profile/user-albums/user-albums.component';
import {UserLikesComponent} from './user/profile/user-likes/user-likes.component';
import {EventsComponent} from './user/events/events.component';
import {PagesComponent} from './user/pages/pages.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {PageComponent} from './user/pages/page/page.component';
import {AlbumComponent} from './user/albums/album/album.component';
import {UserEditComponent} from './user/profile/user-edit/user-edit.component';
import {PostComponent} from './user/posts/post/post.component';
import {TemplateComponent} from './user/template/template.component';
import {PostsComponent} from './user/posts/posts.component';
import {PostWrapperComponent} from './user/posts/post-wrapper/post-wrapper.component';
import {ChatComponent} from './user/friends/chat/chat.component';
import {EventOptionsComponent} from './user/events/event-options/event-options.component';
import {SearchEventsComponent} from './search/search-events/search-events.component';
import {SearchComponent} from './search/search.component';
import {UserAboutComponent} from './user/profile/user-about/user-about.component';
import {UserPhotosComponent} from './user/profile/user-photos/user-photos.component';
import {UserFriendsComponent} from './user/profile/user-friends/user-friends.component';
import {UserHomeComponent} from './user/profile/user-home/user-home.component';
import {UserEventsComponent} from './user/profile/user-events/user-events.component';
import {UserEditInfoComponent} from './user/profile/user-edit/user-edit-info/user-edit-info.component';
import {UserEditPasswordComponent} from './user/profile/user-edit/user-edit-password/user-edit-password.component';
import {UserEditContactComponent} from './user/profile/user-edit/user-edit-contact/user-edit-contact.component';
import {ProfileComponent} from './user/profile/profile/profile.component';
import {EventComponent} from './user/events/event/event.component';
import {EventAboutComponent} from './user/events/event/event-about/event-about.component';
import {EventWrapperComponent} from './user/events/event-wrapper/event-wrapper.component';
import {PageWrapperComponent} from './user/pages/page-wrapper/page-wrapper.component';
import {ChatBoxComponent} from './user/friends/chat/chat-box/chat-box.component';
import {ChatDefaultComponent} from './user/friends/chat/chat-default/chat-default.component';
import {EventReviewComponent} from './shared/event-review/event-review.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'posts', component: TemplateComponent, children: [
      {path: '', component: PostsComponent},
      {path: ':uuid', component: PostWrapperComponent}
    ]
  },
  {
    path: 'pages', children: [
      {path: ':pagename', component: PageComponent},
      {path: ':pagename/edit', component: NewPageComponent}
    ]
  },
  {
    path: 'events', children: [
      {path: 'options', component: EventOptionsComponent},
      {path: 'reviews/:uuid', component: EventReviewComponent},
      {
        path: ':uuid', component: EventComponent, children: [
          {path: '', component: EventAboutComponent},
          {path: 'about', component: EventAboutComponent},
          // {path: 'photos', component: EventPhotosComponent},
          {path: 'edit', component: NewEventComponent},
        ]
      },
    ]
  },
  {
    path: 'messenger', component: ChatComponent, children: [
      {path: '', component: ChatDefaultComponent},
      {path: ':username', component: ChatBoxComponent},
    ]
  },
  // { path: ':username', component: UserComponent},
  {
    path: 'create', children: [
      {path: 'page', component: PageWrapperComponent},
      {path: 'event', component: EventWrapperComponent}
    ]
  },
  {
    path: 'search', component: SearchComponent, children: [
      {path: '', component: SearchEventsComponent},
      {path: 'events', component: SearchEventsComponent}
    ]
  },
  {
    path: ':username', component: ProfileComponent, children: [
      {path: '', component: UserHomeComponent},
      {path: 'home', component: UserHomeComponent},
      {
        path: 'edit', component: UserEditComponent, children: [
          {path: '', component: UserEditInfoComponent},
          {path: 'infos', component: UserEditInfoComponent},
          {path: 'password', component: UserEditPasswordComponent},
          {path: 'contact', component: UserEditContactComponent}
        ]
      },
      {path: 'posts', component: UserPostsComponent},
      {
        path: 'albums', children: [
          {path: '', component: UserAlbumsComponent},
          {path: ':id', component: AlbumComponent}
        ]
      },
      {path: 'likes', component: UserLikesComponent},
      {path: 'pages', component: PagesComponent},
      {path: 'events', component: UserEventsComponent},
      {path: 'about', component: UserAboutComponent},
      {path: 'photos', component: UserPhotosComponent},
      {path: 'friends', component: UserFriendsComponent},
    ]
  },

  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
