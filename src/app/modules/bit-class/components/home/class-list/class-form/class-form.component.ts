import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-class-form',
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss'
})
export class ClassFormComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();

  public classForm: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ClassFormComponent>,
    private readonly classService: GeneralService,
    private readonly endpoint: EndpointsService,
    private readonly toastr: ToastrService,
  ) {
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      days_per_week: [[], Validators.required],
      days_display: [[]],
      hours_per_class: [0, [Validators.required, Validators.min(1)]],
      teacher: [this.classService.userId, Validators.required],
    });
  }

  ngOnInit(): void {
    this.classForm.get('days_per_week')?.valueChanges.subscribe((days: string[]) => {
      this.classForm.patchValue({
        days_display: days.map(day => day.charAt(0).toUpperCase() + day.slice(1))
      }, {emitEvent: false});
    });
  }

  public closeDialog(success: boolean = false): void {
    this.onClose.emit(success);
    this.dialogRef.close(success);
  }

  public onSubmit(): void {
    if (this.classForm.valid) {
      this.classService.post(this.endpoint.path.class, this.classForm.value).subscribe({
        next: () => {
          this.closeDialog(true),
            console.log(this.classForm.value);
          this.toastr.success('Classe criada com sucesso!', 'Sucesso');
        },
        error: (error: Error) => {
          console.error('Erro ao criar classe:', error);
        }
      });
    }
  }
}
