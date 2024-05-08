import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/_guards/auth.guard';
import { CareerComponent } from './career/career.component';
import { accountResolver } from './account/account.resolver';

const routes: Routes = [
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
    resolve: { user: accountResolver },
  },
  {
    path: 'career',
    canActivate: [authGuard],
    component: CareerComponent,
    resolve: { user: accountResolver },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((x) => x.AccountModule),
  },
  { path: '**', redirectTo: '/account/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
