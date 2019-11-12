import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchService} from './search.service';
import { SearchResultComponent } from './search-results/search-result/search-result.component';
import {SportService} from './sport.service';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchResultsComponent,
    SearchResultComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    SearchResultsComponent
  ],
  providers: [SearchService, SportService]
})
export class SharedModule {

}
