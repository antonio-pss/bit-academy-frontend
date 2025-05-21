import {Component} from '@angular/core';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthBaseService} from '../../../../shared/services/auth-base.service';
import {ToastrService} from 'ngx-toastr';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatFabButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public formTitleTxt: string = "Entrar";
  public primaryBtnTxt: string = "Entrar";
  public secondaryBtnTxt: string = "Registrar";

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly generalService: AuthBaseService,
              private readonly toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  public onSubmit() {
    const userData = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    if (this.loginForm.valid) {
      this.generalService.login(
        userData.email, userData.password
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['auth', 'platform-selector'])
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Erro ao fazer login')
        }
      })
    }
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }
}
