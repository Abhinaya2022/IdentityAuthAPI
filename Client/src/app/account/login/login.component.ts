import { Login } from './../../shared/Models/Account/login';
import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Models/Account/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  complexPassword =
    "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$";

  loginForm: FormGroup = this._fb.group({
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', [
      Validators.required,
      Validators.pattern(this.complexPassword),
    ]),
  });
  returnUrl: string = '';
  constructor(
    private _fb: FormBuilder,
    private _service: AccountService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.returnUrl =
      this._activateRoute.snapshot.queryParams['returnUrl'] ?? '/home';
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    let logindto: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this._service.login(logindto).subscribe((user) => {
      if (user) this._router.navigateByUrl(this.returnUrl);
    });
  }
}
