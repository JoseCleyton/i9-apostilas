import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './auth-guard.guard';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./dashboard/admin/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardGuard] },
  { path: 'student', loadChildren: () => import('./dashboard/student/student.module').then(m => m.StudentModule), canActivate: [AuthGuardGuard] }
  ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
