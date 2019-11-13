import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../../shared/shared.module';
import {PostsModule} from '../posts/posts.module';
import {FriendsService} from './friends.service';
import {FriendComponent} from './friend/friend.component';
import {FriendsComponent} from './friends.component';

@NgModule({
  declarations: [
    FriendComponent,
    FriendsComponent,
  ],
  exports: [
    FriendComponent,
    FriendsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    SharedModule,
    PostsModule
  ],
  providers: [FriendsService]
})
export class FriendsModule {

}