import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';


export interface ActivitySubmissionDialogData {
  classId: number;
  activityId: number;
  classMemberId: number;
}

@Component({
  selector: 'app-activity-submission-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
    // outros materiais...
  ],
  templateUrl: './activity-submission-dialog.component.html',
  styleUrls: ['./activity-submission-dialog.component.scss'],
})
export class ActivitySubmissionDialogComponent {
  public submissionForm: FormGroup;
  public loading = false;
  public file: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<ActivitySubmissionDialogComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ActivitySubmissionDialogData,
  ) {
    this.submissionForm = this.fb.group({
      activity: [data.activityId, Validators.required],
      class_member: [data.classMemberId, Validators.required],
      answer: ['', Validators.required],
      submission_file: [null,]
    });
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.file = input.files[0];
    }
  }

  closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }

  onSubmit(): void {
    if (this.submissionForm.invalid) {
      this.submissionForm.markAllAsTouched();
      return;
    }

    const answer = this.submissionForm.value.answer;

    if (!answer && !this.file) {
      this.toastr.error('Forneça uma resposta de texto ou envie um arquivo.');
      return;
    }

    const url = this.endpoint.path.activitySubmissions(this.data.classId, this.data.activityId);
    const formData = new FormData();

    formData.append('answer', answer || '');
    formData.append('activity', String(this.data.activityId));
    formData.append('class_member', String(this.data.classMemberId));

    if (this.file) {
      formData.append('submission_file', this.file); // ✅ File garantido como não-null aqui
    }

    this.loading = true;
    this.generalService.postFormData(url, formData).subscribe({
      next: () => {
        this.toastr.success('Resposta enviada com sucesso!');
        this.closeDialog(true);
      },
      error: (err) => {
        this.toastr.error('Erro ao enviar resposta');
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
