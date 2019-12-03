import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', loadChildren: './users/users.module#UsersModule', canLoad: [AuthGuard]},
  { path: 'invites', loadChildren: './invites/invites.module#InvitesModule', canLoad: [AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
