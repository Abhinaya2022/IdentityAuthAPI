import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/Models/Account/register';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  complexPassword =
    "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$";

  constructor(
    private _fb: FormBuilder,
    private _service: AccountService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.initailizeTheForm();
  }

  initailizeTheForm() {
    this.registerForm = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      displayName: this._fb.control('', Validators.required),
      password: this._fb.control('', [
        Validators.required,
        Validators.pattern(this.complexPassword),
      ]),
    });
  }

  register() {
    let user: Register = {
      email: this.registerForm?.get('email')?.value,
      displayName: this.registerForm?.get('displayName')?.value,
      password: this.registerForm?.get('password')?.value,
    };
    this._service.register(user).subscribe((user) => {
      if (user) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
