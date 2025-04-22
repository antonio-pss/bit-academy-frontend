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
import {GeneralService} from '../../../shared/services/general.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultAuthLayoutComponent} from '../../../templates/default-auth-layout/default-auth-layout.component';

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
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatFabButton,
    DefaultAuthLayoutComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public registerForm: FormGroup;

  public formTitleTxt: string = "Registrar";
  public primaryBtnTxt: string = "Salvar";
  public secondaryBtnTxt: string = "Voltar";

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly generalServices: GeneralService,
              private readonly toastr: ToastrService) {

    this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.min(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {validators: confirmPasswordValidator('password', 'confirmPassword')}
    );
  }

  public onSubmit() {
    console.log(
      this.registerForm.controls['name'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['confirmPassword'].value
    );
    if (this.registerForm.valid) {
      this.generalServices.signup(
        this.registerForm.controls['name'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['username'].value,
        this.registerForm.controls['password'].value
      ).subscribe({

        next: (response) => {
          console.log(response);
          this.router.navigate(['auth/login']).then();
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
