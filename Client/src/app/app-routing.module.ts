import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/_guards/auth.guard';
import { CareerComponent } from './career/career.component';
import { loginOrRegisterGuard } from './core/_guards/login-or-register.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'career',
    canActivate: [authGuard],
    component: CareerComponent,
    data: { breadcrumb: 'Career' },
  },
  {
    path: 'account',
    canActivate: [loginOrRegisterGuard],
    loadChildren: () =>
      import('./account/account.module').then((x) => x.AccountModule),
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./courses/courses.module').then((x) => x.CoursesModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
