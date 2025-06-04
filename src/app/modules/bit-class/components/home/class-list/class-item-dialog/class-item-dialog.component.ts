import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {Router} from '@angular/router';
import {Classroom} from '../../../../../../shared/models/class';
import {takeUntil} from 'rxjs';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {ToastrService} from 'ngx-toastr';
import {WeekDay} from '../../../../../../shared/models/week-day';
import {WeekDayLabel} from '../../../../../../shared/models/week-day-label';

@Component({
  selector: 'app-class-item-dialog',
  standalone: true,
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './class-item-dialog.component.html',
  styleUrls: ['./class-item-dialog.component.scss']
})
export class ClassItemDialogComponent implements OnInit{
  @Output() onClose = new EventEmitter<boolean>();

  public classForm: FormGroup;
  public daysOfWeek: WeekDay[] = Object.values(WeekDay) as WeekDay[];
  public weekDayLabels = WeekDayLabel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ClassItemDialogComponent>,
    private readonly generalService: GeneralService,
    private readonly endpoint: EndpointsService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      days_per_week: [[], Validators.required],        // armazena ['MONDAY', 'WEDNESDAY', ...]
      hours_per_class: [1, [Validators.required, Validators.min(1)]],
      teacher: [this.generalService.userId, Validators.required]
    });
  }

  ngOnInit(): void {
  }
  //
  // ngAfterViewInit(): void {
  //   // Apenas para debug de status do formulário (opcional)
  //   this.classForm.statusChanges.subscribe(status => {
  //     console.log('Status do formulário:', status);
  //     Object.keys(this.classForm.controls).forEach(key => {
  //       const control = this.classForm.get(key);
  //       console.log(`  • Campo ${key}: ${control?.status}`, control?.errors);
  //     });
  //   });
  // }

  public closeDialog(success: boolean = false): void {
    this.onClose.emit(success);
    this.dialogRef.close(success);
  }

  public onNavigate(action: string): Promise<boolean> {
    return this.router.navigate([action]);
  }

  public onSubmit(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
      return;
    }

    const payload: Partial<Classroom> = {
      name: this.classForm.value.name,
      description: this.classForm.value.description,
      days_per_week: this.classForm.value.days_per_week, // array de códigos
      hours_per_class: this.classForm.value.hours_per_class,
      teacher: this.classForm.value.teacher
    };

    this.generalService
      .post(this.endpoint.path.class, payload)
      .pipe(takeUntil(this.generalService.unsubscribe))
      .subscribe({
        next: (response: Classroom) => {
          const classId = response.id;
          this.closeDialog(true);
          this.onNavigate(`class/classroom/${classId}`);
          this.toastr.success('Sala criada com sucesso!');
          console.log('Sala criada com sucesso:', response);
        },
        error: (error: any) => {
          console.error('Erro ao criar sala:', error);
          this.toastr.error(`Erro ao criar sala: ${error.message}`, 'Erro');
        }
      });
  }
}
