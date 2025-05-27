import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {Router} from '@angular/router';
import {Classroom} from '../../../../../../shared/models/class';
import {takeUntil} from 'rxjs';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {COMMON_IMPORTS} from '../../../../../../shared/imports/common';

@Component({
  selector: 'app-class-item-dialog',
  imports: [
    ...MATERIAL_IMPORTS,
    ...COMMON_IMPORTS
  ],
  standalone: true,
  templateUrl: './class-item-dialog.component.html',
  styleUrl: './class-item-dialog.component.scss'
})
export class ClassItemDialogComponent implements AfterViewInit{

  @Output() onClose = new EventEmitter<boolean>();

  public classForm: FormGroup;
  public daysOfWeek: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  // public hoursPerWeek: string[] = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ClassItemDialogComponent>,
    private readonly classService: GeneralService,
    private readonly endpoint: EndpointsService,
    private readonly router: Router,
  ) {
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      id_course_module_discipline: [null],
      schedule: ['', Validators.required],
      hours_per_week: [0, [Validators.required, Validators.min(1), Validators.max(168)]],
    });
  }

  public closeDialog(success: boolean = false): void {
    this.onClose.emit(success);
    this.dialogRef.close(success);
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }

  ngAfterViewInit() {
    this.classForm.statusChanges.subscribe(status => {
      console.log('Status do formulário:', status);
      Object.keys(this.classForm.controls).forEach(key => {
        const control = this.classForm.get(key);
        console.log(`Campo ${key}: ${control?.status}`, control?.errors);
      });
    });
  }

  public onSubmit(): void {
    if (this.classForm.valid) {
      this.classService.post(this.endpoint.path.class, this.classForm.value)
        .pipe(takeUntil(this.classService.unsubscribe))
        .subscribe(
          {
            next: (response: Classroom) => {
              const classId = response.id;
              this.closeDialog(true)
              this.onNavigate('class/classroom/' + classId).then()
              console.log('Classe criada com sucesso:', this.classForm.value);
            },
            error: (error: Error) => {
              console.error('Erro ao criar classe:', error);
            }
          });
    }
  }
}
