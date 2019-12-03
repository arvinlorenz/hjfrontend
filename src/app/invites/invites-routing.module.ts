import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitesComponent } from './invites.component';
import { ResponseComponent } from './response/response.component';
import { CompanionsComponent } from './companions/companions.component';
import { NotComingComponent } from './not-coming/not-coming.component';
import { ComingComponent } from './coming/coming.component';

const routes: Routes = [
  { path: '', component: InvitesComponent, children: [
    {
      path: '', component: ResponseComponent
    },
    {
      path: 'companions', component: CompanionsComponent
    },
    {
      path: 'thank-you', component: NotComingComponent
    },
    {
      path: 'ty', component: ComingComponent
    }
] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitesRoutingModule {}
