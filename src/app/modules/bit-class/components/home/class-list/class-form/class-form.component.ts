import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogContainer, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-class-form',
  imports: [
    MatFormField,
    MatCardHeader,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatCardTitle,
    MatLabel,
    NgIf,
    MatDialogContent,

  ],
  standalone: true,
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss'
})
export class ClassFormComponent {

  @Output() onClose = new EventEmitter<boolean>();

  public classForm: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ClassFormComponent>,
    private readonly classService: GeneralService,
    private readonly endpoint: EndpointsService,
  ) {

    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      id_course_module_discipline: []
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
        },
        error: (error: Error) => {
          console.error('Erro ao criar classe:', error);
        }
      });
    }
  }
}
