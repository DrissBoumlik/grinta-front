import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../../shared/shared.module';
import {PostsModule} from '../posts/posts.module';
import {RelationService} from './relation.service';
import {FriendComponent} from './friend/friend.component';
import {FriendsComponent} from './friends.component';
import {ChatComponent} from './chat/chat.component';
import {ChatBoxComponent} from './chat/chat-box/chat-box.component';
import {ChatService} from './chat.service';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatWrapperComponent } from './chat/chat-wrapper/chat-wrapper.component';

@NgModule({
  declarations: [
    FriendComponent,
    FriendsComponent,
    ChatComponent,
    ChatBoxComponent,
    ChatListComponent,
    ChatWrapperComponent,
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
  providers: [RelationService, ChatService]
})
export class FriendsModule {

}
