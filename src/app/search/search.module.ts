import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SearchComponent} from './search.component';
import {SearchEventsComponent} from './search-events/search-events.component';
import { SearchAllComponent } from './search-all/search-all.component';
import {FriendsModule} from '../user/friends/friends.module';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { SearchPostsComponent } from './search-posts/search-posts.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    SearchComponent,
    SearchEventsComponent,
    SearchAllComponent,
    SearchMenuComponent,
    SearchUsersComponent,
    SearchPostsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FriendsModule,
    InfiniteScrollModule,
  ],
  exports: [
    SearchComponent,
    SearchEventsComponent
  ]
})
export class SearchModule { }
