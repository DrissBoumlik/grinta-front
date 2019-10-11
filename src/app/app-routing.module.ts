import { NewEventComponent } from './user/events/new-event/new-event.component';
import { NewPageComponent } from './user/pages/new-page/new-page.component';
import { PostsComponent } from './user/posts/posts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'profile', component: UserComponent},
  { path: ':username', component: UserComponent},
  { path: 'create', children: [
    { path: 'page', component: NewPageComponent },
    { path: 'event', component: NewEventComponent }
  ]},

  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
