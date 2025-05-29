import {Component, OnInit, signal} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../../shared/imports/material.imports';
import {Classroom} from '../../../../../shared/models/class';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-classroom-settings',
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,
  ],
  templateUrl: './classroom-settings.component.html',
  styleUrl: './classroom-settings.component.scss'
})
export class ClassroomSettingsComponent implements OnInit {
  public isEditMode = signal(true);

  public settingsForm: FormGroup
  public classroom?: Classroom;

  public daysOfWeek: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly classroomService: GeneralService,
    private readonly endpoints: EndpointsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly endpointService: EndpointsService,
    private readonly toastr: ToastrService,
  ) {
    this.settingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      id_course_module_discipline: [''],
      schedule: [[], Validators.required],
      hours_per_week: [null, [Validators.required, Validators.min(1), Validators.max(168)]],
    });
  }

  public get editMode(): boolean {
    return this.isEditMode();
  }

  public get classId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.getClassroom()
    this.setValue()
  }

  public getClassroom(): void {
    this.classroomService.getById(this.endpointService.path.classById, Number(this.classId)).subscribe({
      next: (classroom: Classroom) => {
        this.classroom = classroom;
        this.toastr.success('Turma carregada com sucesso!');
        console.log('Turma carregada com sucesso:', this.classroom);
      },
      error: (error) => {
        console.error('Erro ao carregar a turma:', error);
        this.toastr.error('Erro ao carregar a turma', '', {})
      }
    });
  }

  public onEdit(): void {
    this.isEditMode.set(!this.isEditMode());
  }

  public onNavigate(action: string) {
    this.router.navigate([action]);
  }

  public onDelete() {
    if (this.classroom && this.classroom.id) {
      this.classroomService.delete(this.endpoints.path.classById, this.classroom.id).subscribe({
        next: (response) => {
          console.log('Sala excluída com sucesso');
          this.toastr.success('Sala excluída com sucesso');
          this.onNavigate('class/home/');
        },
        error: (err) => {
          console.error('Erro ao excluir a sala:', err);
          this.toastr.error('Erro ao excluir a sala');
        }
      });
    }
  }

  public onSubmit() {
    if (this.settingsForm.valid && this.classroom?.id) {
      const updatedData = this.settingsForm.value;
      this.classroomService.update(this.endpoints.path.classById, this.classroom.id, updatedData).subscribe({
        next: () => {
          console.log('Sala atualizada com sucesso');
          this.toastr.success('Sala atualizada com sucesso');
          this.isEditMode.set(true);
          this.getClassroom();
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          this.toastr.error('Erro ao atualizar a sala');
        }
      });
    }
  }

  public setValue() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.classroomService.getById(this.endpoints.path.classById, Number(this.activatedRoute.snapshot.params['id']))
        .subscribe({
          next: (classroom: Classroom) => {
            this.classroom = classroom;
            this.settingsForm.patchValue({
              name: classroom.name,
              description: classroom.description,
              id_course_module_discipline: classroom.id_course_module_discipline,
              schedule: classroom.schedule || [],
              hours_per_week: classroom.hours_per_week
            });
          },
          error: (error) => {
            console.error('Erro ao carregar a turma:', error);
            this.toastr.error('Erro ao carregar a turma', '', {});
          }
        });
    }
  }
}
