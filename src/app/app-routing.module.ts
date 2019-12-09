import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminAuthGuard } from './auth/admin-auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', loadChildren: './users/users.module#UsersModule', canLoad: [AuthGuard, AdminAuthGuard]},
  { path: 'programs', loadChildren: './programs/programs.module#ProgramsModule', canLoad: [AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
