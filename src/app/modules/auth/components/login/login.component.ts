import {Component} from '@angular/core';
import {MatButton, MatButtonModule, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthBaseService} from '../../../../shared/services/auth-base.service';
import {ToastrService} from 'ngx-toastr';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatFabButton,
    TranslatePipe,
    MatButton,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  idiomaAtual = 'pt';
  public loginForm: FormGroup;
  public formTitleTxt: string = "Entrar";
  public primaryBtnTxt: string = "Entrar";
  public secondaryBtnTxt: string = "Registrar";

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly generalService: AuthBaseService,
              private readonly toastr: ToastrService,
              private translate: TranslateService) {
    const idiomaSalvo = localStorage.getItem('idioma') || 'pt';
    this.translate.setDefaultLang(idiomaSalvo);
    this.translate.use(idiomaSalvo);
    this.idiomaAtual = idiomaSalvo;
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

  trocarIdioma(): void {
    this.idiomaAtual = this.idiomaAtual === 'pt' ? 'en' : 'pt';
    this.translate.use(this.idiomaAtual);
    localStorage.setItem('idioma', this.idiomaAtual); // Salva o idioma
  }
}
