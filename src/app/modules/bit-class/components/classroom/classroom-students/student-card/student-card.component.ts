import {Component, Input, OnInit, signal} from '@angular/core';
import {ClassMember} from '../../../../../../shared/models/class-member';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../../shared/models/user';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Classroom} from '../../../../../../shared/models/class';

@Component({
  selector: 'app-student-card',
  imports: [
    MATERIAL_IMPORTS
  ],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent implements OnInit {
  readonly panelOpenState = signal(false);
  @Input() student!: ClassMember;

  public students: ClassMember[] = [];
  public settingsForm: FormGroup;
  public user?: ClassMember;
  public editMode = signal(false);


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly generalService: GeneralService,
    private readonly endpoints: EndpointsService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
    this.settingsForm = this.formBuilder.group({
      class_id: ['', Validators.required],
      student: ['', Validators.required],
      joined_at: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  // public loadUser(): void {
  //   const userId = this.generalService.userId;
  //   this.generalService.getById(this.endpoints.path.classMembers(0), userId).subscribe({
  //     next: (user: ClassMember) => {
  //       this.user = user;
  //       this.settingsForm.patchValue({
  //         class_id: user.class_id,
  //         student: user.student,
  //         joined_at: user.joined_at,
  //         role: user.role,
  //       });
  //     },
  //     error: () => {
  //       this.toastr.error('Erro ao carregar perfil');
  //     }
  //   });
  // }

  loadStudents(): void {
    const classId = 1; // ou pegue dinamicamente
    const url = this.endpoints.path.classMembers(classId); // deve retornar uma URL

    this.generalService.get(url).subscribe({
      next: (data: ClassMember) => {
        this.student = data;
        console.log('Alunos carregados:', data); // <--- Debug importante
      },
      error: () => {
        this.toastr.error('Erro ao carregar alunos');
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
        class_id: this.user.class_id,
        student: this.user.student,
        joined_at: this.user.joined_at,
        role: this.user.role,
      });
    }
  }


  public onDelete() {
    if (this.user && this.user.id) {
      this.generalService.delete(this.endpoints.path.user, this.user.id).subscribe({
        next: () => {
          this.toastr.success('Aluno excluído com sucesso');
          this.onNavigate('login');
        },
        error: () => {
          this.toastr.error('Erro ao excluir a aluno');
        }
      });
    }
  }

  public onSubmit() {
    if (this.settingsForm.valid && this.user?.id) {
      const updatedData = this.settingsForm.value;
      this.generalService.update(this.endpoints.path.user, this.user.id, updatedData).subscribe({
        next: () => {
          this.toastr.success('Aluno atualizado com sucesso');
          this.editMode.set(false);
          this.loadStudents(); // <-- recarrega dados atualizados
        },
        error: () => {
          this.toastr.error('Erro ao atualizar a aluno');
        }
      });
    }
  }


}
