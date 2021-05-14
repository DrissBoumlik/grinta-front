import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchService} from './search.service';
import {SearchResultComponent} from './search-results/search-result/search-result.component';
import {SportService} from './sport.service';
import {FeedbackComponent} from './feedback/feedback.component';
import {ToolsService} from './tools.service';
import {FeedbackService} from './feedback/feedback.service';
import {HandlerService} from './handler.service';
import {MapComponent} from './maps/map/map.component';
import {EventService} from './event.service';
import {EventActionsComponent} from './events/event-actions/event-actions.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ExcerptPipe} from './pipes/excerpt.pipe';
import {MapPreviewComponent} from './maps/map-preview/map-preview.component';
import {LocationPipe} from './pipes/location.pipe';
import {EventFeedbackComponent} from './events/event-feedback/event-feedback.component';
import {EventReviewComponent} from './events/event-review/event-review.component';
import {EventFeedbackService} from './events/event-feedback/event-feedback.service';
import {UserOptionsComponent} from './user-options/user-options.component';
import {LatestEventsComponent} from './meta-info-wrapper/updates/latest-events/latest-events.component';
import {LatestBirthDatesComponent} from './meta-info-wrapper/updates/latest-birth-dates/latest-birth-dates.component';
import {MediaService} from './media.service';
import {NoteService} from './note.service';
import {MapService} from './map.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import { MetaInfoWrapperComponent } from './meta-info-wrapper/meta-info-wrapper.component';
import { UpdatesComponent } from './meta-info-wrapper/updates/updates.component';
import { GrintaaaDetailsComponent } from './meta-info-wrapper/grintaaa-details/grintaaa-details.component';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchResultsComponent,
    SearchResultComponent,
    FeedbackComponent,
    MapComponent,
    EventActionsComponent,
    SpinnerComponent,
    ExcerptPipe,
    MapPreviewComponent,
    LocationPipe,
    EventFeedbackComponent,
    EventReviewComponent,
    UserOptionsComponent,
    LatestEventsComponent,
    LatestBirthDatesComponent,
    MetaInfoWrapperComponent,
    UpdatesComponent,
    GrintaaaDetailsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    LeafletModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  exports: [
    HeaderComponent,
    SearchResultsComponent,
    FeedbackComponent,
    MapComponent,
    EventActionsComponent,
    SpinnerComponent,
    ExcerptPipe,
    MapPreviewComponent,
    LocationPipe,
    UserOptionsComponent,
    LatestEventsComponent,
    LatestBirthDatesComponent,
    MetaInfoWrapperComponent,
    UpdatesComponent,
    GrintaaaDetailsComponent,
  ],
  providers: [
    SearchService,
    SportService,
    ToolsService,
    FeedbackService,
    EventFeedbackService,
    HandlerService,
    EventService,
    MediaService,
    NoteService,
    MapService
  ]
})
export class SharedModule {

}
