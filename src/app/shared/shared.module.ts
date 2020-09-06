import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchService} from './search.service';
import { SearchResultComponent } from './search-results/search-result/search-result.component';
import {SportService} from './sport.service';
import { FeedbackComponent } from './feedback/feedback.component';
import {ToolsService} from './tools.service';
import {FeedbackService} from './feedback/feedback.service';
import {HandlerService} from './handler.service';
import { MapComponent } from './map/map.component';
import {EventService} from './event.service';
import { ExcerptPipe } from './excerpt.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchResultsComponent,
    SearchResultComponent,
    FeedbackComponent,
    MapComponent,
    ExcerptPipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    SearchResultsComponent,
    FeedbackComponent,
    MapComponent,
  ],
  providers: [SearchService, SportService, ToolsService, FeedbackService, HandlerService, EventService]
})
export class SharedModule {

}
