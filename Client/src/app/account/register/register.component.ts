import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/shared/Models/Account/register';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  complexPassword =
    "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$";

  constructor(
    private _fb: FormBuilder,
    private _service: AccountService,
    private _router: Router,
    private _courseServ: CoursesService
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
    if (this.registerForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    let user: Register = {
      email: this.registerForm?.get('email')?.value,
      displayName: this.registerForm?.get('displayName')?.value,
      password: this.registerForm?.get('password')?.value,
    };
    this._service.register(user).subscribe({
      next: (_) => this._router.navigateByUrl('/'),
      error: (error) => console.error(error),
      complete: () => {
        this._courseServ.loadCurrentCart(user.email);
      },
    });
  }
}
