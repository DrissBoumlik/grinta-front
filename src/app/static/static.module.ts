import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import {SharedModule} from '../shared/shared.module';
import {FriendsModule} from '../user/friends/friends.module';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    MaintenanceComponent,
    ComingSoonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FriendsModule,
  ]
})
export class StaticModule { }
