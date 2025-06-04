import { Component, OnInit, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../../shared/imports/material.imports';
import { Classroom} from '../../../../../shared/models/class';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralService } from '../../../../../shared/services/general.service';
import { EndpointsService } from '../../../../../shared/services/endpoints.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {WeekDay} from '../../../../../shared/models/week-day';
import {WeekDayLabel} from '../../../../../shared/models/week-day-label';

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
  public editMode = signal(false);

  public settingsForm: FormGroup;
  public classroom?: Classroom;

  public weekDayKeys = Object.keys(WeekDay) as WeekDay[];
  public weekDayLabel = WeekDayLabel;
  public hoursPerClassOptions = [1, 2, 3, 4, 5, 6];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly classroomService: GeneralService,
    private readonly endpoints: EndpointsService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
  ) {
    this.settingsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      days_per_week: [[], Validators.required],
      hours_per_class: [1, [Validators.required, Validators.min(1), Validators.max(168)]],
      teacher: [this.classroomService.userId, Validators.required],
    });
  }

  public get classId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  public get isEditMode(): boolean {
    return this.editMode();
  }

  ngOnInit(): void {
    this.loadClassroom();
  }

  public loadClassroom(): void {
    this.classroomService.getById(this.endpoints.path.classById, Number(this.classId)).subscribe({
      next: (classroom: Classroom) => {
        this.classroom = classroom;
        this.settingsForm.patchValue({
          name: classroom.name,
          description: classroom.description,
          days_per_week: classroom.days_per_week || [],
          hours_per_class: classroom.hours_per_class || 1,
          teacher: classroom.teacher,
        });
      },
      error: () => {
        this.toastr.error('Erro ao carregar a turma');
      }
    });
  }

  public toggleEditMode(): void {
    this.editMode.update(value => !value);
    if (!this.isEditMode && this.classroom) {
      // Se cancelar, restaura os valores originais
      this.settingsForm.patchValue({
        name: this.classroom.name,
        description: this.classroom.description,
        days_per_week: this.classroom.days_per_week || [],
        hours_per_class: this.classroom.hours_per_class || 1,
        teacher: this.classroom.teacher,
      });
    }
  }

  public onNavigate(path: string) {
    this.router.navigate([path]);
  }

  public onDelete() {
    if (this.classroom && this.classroom.id) {
      this.classroomService.delete(this.endpoints.path.classById, this.classroom.id).subscribe({
        next: () => {
          this.toastr.success('Sala excluída com sucesso');
          this.onNavigate('class/home');
        },
        error: () => {
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
          this.toastr.success('Sala atualizada com sucesso');
          this.editMode.set(false);
          this.loadClassroom();
        },
        error: () => {
          this.toastr.error('Erro ao atualizar a sala');
        }
      });
    }
  }
}
