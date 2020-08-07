import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainviewComponent } from './pages/mainview/mainview.component';
import { PacketchartComponent } from './pages/packetchart/packetchart.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlockedipsComponent } from './pages/blockedips/blockedips.component';
import { LoginComponent } from './pages/login/login.component';
import { SupportComponent } from './pages/support/support.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login',component: LoginComponent},
  {path: 'main',component: MainviewComponent,
  children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {path: 'dashboard', component: PacketchartComponent},
    {path: 'blockedips', component: BlockedipsComponent},
    {path: 'support', component: SupportComponent}
  ]},
  {path: 'register',component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
