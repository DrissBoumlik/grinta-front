import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SearchComponent} from './search.component';
import {SearchEventsComponent} from './search-events/search-events.component';



@NgModule({
  declarations: [
    SearchComponent,
    SearchEventsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SearchComponent,
    SearchEventsComponent
  ]
})
export class SearchModule { }
