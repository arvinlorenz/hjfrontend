import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitesComponent } from './invites.component';
import { ResponseComponent } from './response/response.component';
import { CompanionsComponent } from './companions/companions.component';


const routes: Routes = [
  { path: '', component: InvitesComponent, children: [
    {
      path: '', component: ResponseComponent
    },
    {
      path: 'companions', component: CompanionsComponent
    },
] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitesRoutingModule {}
