import { Component } from '@angular/core';
import { DefaultAuthLayoutComponent } from "../../../views/default-auth-layout/default-auth-layout.component";
import { MatButton } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField);
    const confirmPassword = group.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword.setErrors(null);
        } else {
          confirmPassword.setErrors(errors);
        }
      }
    }

    return null; // sempre retorna null para o group, erros vão direto no campo confirmPassword agora
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DefaultAuthLayoutComponent,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public formTitleTxt: string = "Registrar";
  public primaryBtnTxt: string = "Registrar";
  public secondaryBtnTxt: string = "Voltar";

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {
    this.registerForm = fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.min(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      console.log(
        this.registerForm.controls['name'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['username'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['confirmPassword'].value
      );
    }
  }

  public onNavigate(action: any[]) {
    return this.router.navigate(action).then();
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
