import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthBaseService} from '../../../../shared/services/auth-base.service';

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField);
    const confirmPassword = group.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({passwordMismatch: true});
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
  selector: 'app-signup',
  imports: [
    MatFabButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public formTitleTxt: string = "Registrar";
  public primaryBtnTxt: string = "Salvar";
  public secondaryBtnTxt: string = "Voltar";

  public registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly generalServices: AuthBaseService,
              private readonly toastr: ToastrService) {

    this.registerForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: confirmPasswordValidator('password', 'confirmPassword')
    })
  }


  public onSubmit() {
    const userData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value
    };

    if (this.registerForm.valid) {
      this.generalServices.signup(
        userData.name,
        userData.email,
        userData.username,
        userData.password)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['auth/login']).then();
            this.toastr.success("Usuário registrado com sucesso");
          },
          error: (error) => {
            console.error(error);
            this.toastr.error('Erro ao registrar usuário')
          }
        })
    }
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
