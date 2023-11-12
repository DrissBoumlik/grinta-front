import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import {SharedModule} from '../shared/shared.module';
import {FriendsModule} from '../user/friends/friends.module';
import { PageErrorServerComponent } from './page-error-server/page-error-server.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    MaintenanceComponent,
    ComingSoonComponent,
    PageErrorServerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FriendsModule,
    RouterModule,
  ]
})
export class StaticModule { }
