import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {User} from '../../../../../../shared/models/core/user';
import {ClassMemberRole} from '../../../../../../shared/models/bit-class-models/class-member';

export interface StudentItemDialogData {
  classId: number;
}

@Component({
  selector: 'app-student-item-dialog',
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,
  ],
  templateUrl: './student-item-dialog.component.html',
  styleUrls: ['./student-item-dialog.component.scss'],
  standalone: true,
})

export class StudentItemDialogComponent implements OnInit {
  public classMemberForm: FormGroup;
  public availableStudents: User[] = [];

  constructor(
    private dialogRef: MatDialogRef<StudentItemDialogComponent>,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: StudentItemDialogData,
  ) {
    this.classMemberForm = this.formBuilder.group({
      user_id: ['', Validators.required], //
      class_id: [data.classId, Validators.required],
      joined_at: [new Date(), Validators.required],
      role: [ClassMemberRole.STUDENTS, Validators.required], // campo role adicionado
    });
  }

  ngOnInit() {
    this.loadAvailableStudents();
  }

  public closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }

  public onSubmit(): void {
    if (this.classMemberForm.invalid) {
      this.classMemberForm.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.classMemberForm.value,
      user_id: this.classMemberForm.value.user_id // já será só o id
    };

    this.generalService
      .post(this.endpoint.path.addStudent(this.data.classId), payload)
      .subscribe({
        next: () => {
          this.toastr.success('Aluno matriculado com sucesso!');
          this.closeDialog(true);
        },
        error: (err) => {
          this.toastr.error('Erro ao matricular aluno');
          console.error(err);
        }
      });
  }

  loadAvailableStudents(): void {
    this.generalService
      .get(this.endpoint.path.addStudent(this.data.classId))
      .subscribe({
        next: (students: User[]) => this.availableStudents = students,
        error: () => this.toastr.error('Erro ao buscar alunos disponíveis')
      });
  }
}
