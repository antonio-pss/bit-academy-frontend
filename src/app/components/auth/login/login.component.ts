import { Component } from '@angular/core';
import {DefaultAuthLayoutComponent} from '../../../views/default-auth-layout/default-auth-layout.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    DefaultAuthLayoutComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      console.log(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value);
    }
  }

  public onNavigate(action:any[]){
    return this.router.navigate(action).then();
  }
}
