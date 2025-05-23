import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {Router} from '@angular/router';
import {Class} from '../../../../../../shared/models/class';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'app-class-item-dialog',
  imports: [
    MatFormField,
    MatCardHeader,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatCardTitle,
    MatLabel,
    MatDialogContent
  ],
  standalone: true,
  templateUrl: './class-item-dialog.component.html',
  styleUrl: './class-item-dialog.component.scss'
})
export class ClassItemDialogComponent {

  @Output() onClose = new EventEmitter<boolean>();

  public classForm: FormGroup

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
      id_course_module_discipline: []
    });
  }

  public closeDialog(success: boolean = false): void {
    this.onClose.emit(success);
    this.dialogRef.close(success);
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }


  public onSubmit(): void {
    if (this.classForm.valid) {
      this.classService.post(this.endpoint.path.class, this.classForm.value)
        .pipe(takeUntil(this.classService.unsubscribe))
        .subscribe(
          {
            next: (response: Class) => {
              const classId = response.id;
              this.closeDialog(true)
              this.onNavigate('clasroom').then()
              console.log('Classe criada com sucesso:', this.classForm.value);
            },
            error: (error: Error) => {
              console.error('Erro ao criar classe:', error);
            }
          });
    }
  }
}
