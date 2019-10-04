import { PostsComponent } from './user/posts/posts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'profile', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
