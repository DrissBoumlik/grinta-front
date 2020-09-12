import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {SearchEventsComponent} from './search-events/search-events.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    SearchComponent,
    SearchEventsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SearchComponent,
    SearchEventsComponent
  ]
})
export class SearchModule { }
