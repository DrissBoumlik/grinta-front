import {NewEventComponent} from './user/events/new-event/new-event.component';
import {NewPageComponent} from './user/pages/new-page/new-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {UserComponent} from './user/user.component';
import {ProfilePostsComponent} from './user/profile/profile-posts/profile-posts.component';
import {ProfileAlbumsComponent} from './user/profile/profile-media/profile-albums/profile-albums.component';
import {ProfileLikesComponent} from './user/profile/profile-likes/profile-likes.component';
import {EventsComponent} from './user/events/events.component';
import {PagesComponent} from './user/pages/pages.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {PageComponent} from './user/pages/page/page.component';
import {AlbumComponent} from './user/albums/album/album.component';
import {ProfileEditComponent} from './user/profile/profile-edit/profile-edit.component';
import {PostComponent} from './user/posts/post/post.component';
import {TemplateComponent} from './user/template/template.component';
import {PostsComponent} from './user/posts/posts.component';
import {PostWrapperComponent} from './user/posts/post-wrapper/post-wrapper.component';
import {ChatComponent} from './user/friends/chat/chat.component';
import {EventOptionsComponent} from './user/events/event-options/event-options.component';
import {SearchEventsComponent} from './search/search-events/search-events.component';
import {SearchComponent} from './search/search.component';
import {ProfileAboutComponent} from './user/profile/profile-about/profile-about.component';
import {ProfilePhotosComponent} from './user/profile/profile-media/profile-photos/profile-photos.component';
import {ProfileFriendsComponent} from './user/profile/profile-friends/profile-friends.component';
import {ProfileHomeComponent} from './user/profile/profile-home/profile-home.component';
import {ProfileEventsComponent} from './user/profile/profile-events/profile-events.component';
import {ProfileEditInfoComponent} from './user/profile/profile-edit/profile-edit-info/profile-edit-info.component';
import {ProfileEditPasswordComponent} from './user/profile/profile-edit/profile-edit-password/profile-edit-password.component';
import {ProfileEditContactComponent} from './user/profile/profile-edit/profile-edit-contact/profile-edit-contact.component';
import {ProfileComponent} from './user/profile/profile/profile.component';
import {EventComponent} from './user/events/event/event.component';
import {EventAboutComponent} from './user/events/event/event-about/event-about.component';
import {EventWrapperComponent} from './user/events/event-wrapper/event-wrapper.component';
import {PageWrapperComponent} from './user/pages/page-wrapper/page-wrapper.component';
import {ChatBoxComponent} from './user/friends/chat/chat-box/chat-box.component';
import {ChatDefaultComponent} from './user/friends/chat/chat-default/chat-default.component';
import {EventReviewComponent} from './shared/events/event-review/event-review.component';
import {EventsWrapperComponent} from './user/events/events-wrapper/events-wrapper.component';
import {AuthenticationGuard} from './auth/authentication.guard';
import {ProfileMediaComponent} from './user/profile/profile-media/profile-media.component';
import {ProfileVideosComponent} from './user/profile/profile-media/profile-videos/profile-videos.component';
import {NewAlbumComponent} from './user/profile/profile-media/new-album/new-album.component';
import {NewPhotoComponent} from './user/profile/profile-media/new-photo/new-photo.component';
import {NewVideoComponent} from './user/profile/profile-media/new-video/new-video.component';
import {ProfileAlbumComponent} from './user/profile/profile-media/profile-albums/profile-album/profile-album.component';
import {ProfileNotesComponent} from './user/profile/profile-notes/profile-notes.component';
import {PrivacyPolicyComponent} from './static/privacy-policy/privacy-policy.component';
import {TermsOfUseComponent} from './static/terms-of-use/terms-of-use.component';
import {MaintenanceComponent} from './static/maintenance/maintenance.component';
import {ComingSoonComponent} from './static/coming-soon/coming-soon.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', canActivate: [AuthenticationGuard], children: [
      {path: '', component: HomeComponent},
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
          {path: '', component: EventsWrapperComponent},
          {path: 'options', component: EventOptionsComponent},
          {
            path: ':uuid', component: EventComponent, children: [
              {path: '', component: EventAboutComponent},
              {path: 'about', component: EventAboutComponent},
              {path: 'reviews', component: EventReviewComponent},
              // {path: 'photos', component: EventPhotosComponent},
              {path: 'edit', component: NewEventComponent},
            ]
          },
        ]
      },
      {
        path: 'messages', component: ChatComponent, children: [
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
      {path: 'coming-soon', component: ComingSoonComponent},
      {path: 'maintenance', component: MaintenanceComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent},
      {path: 'terms-of-use', component: TermsOfUseComponent},
      {
        path: ':username', component: ProfileComponent, children: [
          {path: '', component: ProfileHomeComponent},
          {path: 'home', component: ProfileHomeComponent},
          {
            path: 'edit', component: ProfileEditComponent, children: [
              {path: '', component: ProfileEditInfoComponent},
              {path: 'infos', component: ProfileEditInfoComponent},
              {path: 'password', component: ProfileEditPasswordComponent},
              {path: 'contact', component: ProfileEditContactComponent}
            ]
          },
          {path: 'posts', component: ProfilePostsComponent},
          // {
          //   path: 'albums', children: [
          //     {path: '', component: ProfileAlbumsComponent},
          //     {path: ':id', component: AlbumComponent}
          //   ]
          // },
          {
            path: 'media', component: ProfileMediaComponent, children: [
              {path: '', component: ProfilePhotosComponent},
              {path: 'photos', component: ProfilePhotosComponent},
              {path: 'videos', component: ProfileVideosComponent},
              {
                path: 'albums', children: [
                  {path: '', component: ProfileAlbumsComponent},
                  {path: ':uuid', component: ProfileAlbumComponent}
                ]
              }
            ]
          },
          {path: 'likes', component: ProfileLikesComponent},
          {path: 'pages', component: PagesComponent},
          {path: 'events', component: ProfileEventsComponent},
          {path: 'notes', component: ProfileNotesComponent},
          {path: 'about', component: ProfileAboutComponent},
          // {path: 'photos', component: ProfilePhotosComponent},
          {path: 'friends', component: ProfileFriendsComponent},
          {
            path: 'create', children: [
              {path: 'album', component: NewAlbumComponent},
              {path: 'photo', component: NewPhotoComponent},
              {path: 'video', component: NewVideoComponent},
            ]
          }
        ]
      },
    ]
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule {
}
