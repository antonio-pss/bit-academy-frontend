import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatFabButton} from '@angular/material/button';
import {GeneralService} from '../../../shared/services/general.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultAuthLayoutComponent} from '../../../templates/default-auth-layout/default-auth-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFabButton,
    DefaultAuthLayoutComponent
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
              private readonly generalService: GeneralService,
              private readonly toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public onSubmit() {
    console.log(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value);

    if (this.loginForm.valid) {
      this.generalService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value).subscribe({

        next: (response) => {
          console.log(response);
          this.router.navigate(['auth/platform-selector']).then();
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
