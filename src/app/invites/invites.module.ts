import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitesComponent } from './invites.component';
import { InvitesRoutingModule } from './invites-routing.module';
import { ResponseComponent } from './response/response.component';
import { CompanionsComponent } from './companions/companions.component';

import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [InvitesComponent, ResponseComponent, CompanionsComponent],
  imports: [
    CommonModule,
    InvitesRoutingModule,
    MatCheckboxModule
  ]
})
export class InvitesModule { }
