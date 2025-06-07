import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../shared/services/general.service';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../../shared/models/core/user';
import {Router} from '@angular/router';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  public formtTitleTxt: string = "Perfil";
  public settingsForm: FormGroup;
  public user?: User;
  public editMode = signal(false);


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly endpoints: EndpointsService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
    this.settingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    const userId = this.generalService.userId;
    this.generalService.getById(this.endpoints.path.user, userId).subscribe({
      next: (user: User) => {
        this.user = user;
        this.settingsForm.patchValue({
          name: user.name,
          username: user.username,
          email: user.email,
        });
      },
      error: () => {
        this.toastr.error('Erro ao carregar perfil');
      }
    });
  }


  public get isEditMode(): boolean {
    return this.editMode();
  }

  public onNavigate(path: string) {
    this.router.navigate([path]).then();
  }

  public toggleEditMode(): void {
    this.editMode.update(value => !value);
    if (!this.isEditMode && this.user) {
      // Se cancelar, restaura os valores originais
      this.settingsForm.patchValue({
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
      });
    }
  }


  public onDelete() {
    if (this.user && this.user.id) {
      this.generalService.delete(this.endpoints.path.user, this.user.id).subscribe({
        next: () => {
          this.toastr.success('Usuário excluído com sucesso');
          this.onNavigate('login');
        },
        error: () => {
          this.toastr.error('Erro ao excluir a usuário');
        }
      });
    }
  }

  public onSubmit() {
    if (this.settingsForm.valid && this.user?.id) {
      const updatedData = this.settingsForm.value;
      this.generalService.update(this.endpoints.path.user, this.user.id, updatedData).subscribe({
        next: () => {
          this.toastr.success('Usuário atualizado com sucesso');
          this.editMode.set(false);
          this.loadUser(); // <-- recarrega dados atualizados
        },
        error: () => {
          this.toastr.error('Erro ao atualizar a usuário');
        }
      });
    }
  }

}
