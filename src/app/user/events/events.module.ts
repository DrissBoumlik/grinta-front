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



@NgModule({
  declarations: [
    EventsComponent,
    NewEventComponent,
    EventComponent,
    EventOptionsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    EventsComponent,
    NewEventComponent,
    EventComponent,
  ],
  providers: [EventService]
})
export class EventsModule { }
