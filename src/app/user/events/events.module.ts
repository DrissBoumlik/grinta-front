import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventService} from '../../shared/event.service';
import {EventsComponent} from './events.component';
import {NewEventComponent} from './new-event/new-event.component';
import {EventComponent} from './event/event.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EventOptionsComponent } from './event-options/event-options.component';
import {RouterModule} from '@angular/router';
import {FriendsModule} from '../friends/friends.module';
import { EventAboutComponent } from './event/event-about/event-about.component';
import { EventInvitationComponent } from './event/event-invitation/event-invitation.component';



@NgModule({
  declarations: [
    EventsComponent,
    NewEventComponent,
    EventComponent,
    EventOptionsComponent,
    EventAboutComponent,
    EventInvitationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FriendsModule,
    SharedModule
  ],
  exports: [
    EventsComponent,
    NewEventComponent,
    EventComponent,
    EventOptionsComponent,
  ],
  providers: [EventService]
})
export class EventsModule { }
