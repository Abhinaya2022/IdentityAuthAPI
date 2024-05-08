import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginOrRegisterGuard } from '../core/_guards/login-or-register.guard';

const routes: Routes = [
  {
    path: 'login',
    runGuardsAndResolvers: 'always',
    canActivate: [loginOrRegisterGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    runGuardsAndResolvers: 'always',
    canActivate: [loginOrRegisterGuard],
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
