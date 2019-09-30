import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import {LoginService} from './login/login.service';
import { HeaderComponent } from './header/header.component';
import { PostService } from './user/post/post.service';
import { PostComponent } from './user/post/post.component';
import { FriendComponent } from './user/friend/friend.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    PostComponent,
    FriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
