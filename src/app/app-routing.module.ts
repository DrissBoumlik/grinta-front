import {NewEventComponent} from './user/events/new-event/new-event.component';
import {NewPageComponent} from './user/pages/new-page/new-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './Auth/login/login.component';
import {UserComponent} from './user/user.component';
import {UserPostsComponent} from './user/profile/user-posts/user-posts.component';
import {UserAlbumsComponent} from './user/profile/user-albums/user-albums.component';
import {UserLikesComponent} from './user/profile/user-likes/user-likes.component';
import {EventsComponent} from './user/events/events.component';
import {PagesComponent} from './user/pages/pages.component';
import {HomeComponent} from './user/home/home.component';
import {RegisterComponent} from './Auth/register/register.component';
import {PageComponent} from './user/pages/page/page.component';
import {AlbumComponent} from './user/albums/album/album.component';
import {EditUserComponent} from './user/profile/edit-user/edit-user.component';
import {PostComponent} from './user/posts/post/post.component';
import {TemplateComponent} from './user/template/template.component';
import {PostsComponent} from './user/posts/posts.component';
import {PostWrapperComponent} from './user/post-wrapper/post-wrapper.component';
import {ChatComponent} from './user/friends/chat/chat.component';
import {EventOptionsComponent} from './user/events/event-options/event-options.component';
import {SearchEventsComponent} from './user/search/search-events/search-events.component';


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
    ]
  },
  {path: 'messenger', component: TemplateComponent, children: [
      {path: ':username', component: ChatComponent},
    ]
  },
  // { path: ':username', component: UserComponent},
  {
    path: 'create', children: [
      {path: 'page', component: NewPageComponent},
      {path: 'event', component: NewEventComponent}
    ]
  },
  {
    path: 'search', children: [
      {path: 'events', component: SearchEventsComponent}
    ]
  },
  {
    path: ':username', component: UserComponent, children: [
      {path: '', component: UserPostsComponent},
      {path: 'edit', component: EditUserComponent},
      {path: 'posts', component: UserPostsComponent},
      {
        path: 'albums', children: [
          {path: '', component: UserAlbumsComponent},
          {path: ':id', component: AlbumComponent}
        ]
      },
      {path: 'likes', component: UserLikesComponent},
      {path: 'pages', component: PagesComponent},
      {path: 'events', component: EventsComponent},
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
