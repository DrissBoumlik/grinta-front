import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NewPageComponent} from './new-page/new-page.component';
import {PageComponent} from './page/page.component';
import {PagesComponent} from './pages.component';
import {PageItemComponent} from './page-item/page-item.component';
import {PageService} from './page/page.service';
import {SharedModule} from '../../shared/shared.module';
import {PostsModule} from '../posts/posts.module';

@NgModule({
  declarations: [
    NewPageComponent,
    PageComponent,
    PagesComponent,
    PageItemComponent,
  ],
  exports: [
    NewPageComponent,
    PageComponent,
    PagesComponent,
    PageItemComponent,
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
  providers: [PageService]
})
export class PagesModule {

}
