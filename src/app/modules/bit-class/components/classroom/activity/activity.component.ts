import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from '../../../../../shared/models/bit-class-models/activity';
import { GeneralService } from '../../../../../shared/services/general.service';
import { ClassMember } from '../../../../../shared/models/bit-class-models/class-member';
import {ActivitySubmissionDialogComponent} from "./activity-submission-dialog/activity-submission-dialog.component";
import {MATERIAL_IMPORTS} from "../../../../../shared/imports/material.imports";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    DatePipe
  ],
})
export class ActivityComponent {
  @Input() activities: Activity[] = [];
  @Input() classId!: number; // Recebido do componente pai (turma)
  @Input() studentList: ClassMember[] = []; // Lista dos membros da turma

  private readonly dialog = inject(MatDialog);
  private readonly generalService = inject(GeneralService);

  // Retorna o classMemberId do aluno logado para esta turma
  getLoggedClassMemberId(): number | null {
    const userId = this.generalService.userId;
    const classMember = this.studentList.find(m => m.user.id === userId);
    return classMember ? classMember.id : null;
  }

  openSubmissionDialog(activity: Activity): void {
    const classMemberId = this.getLoggedClassMemberId();
    if (!classMemberId) {
      alert('Usuário não é aluno desta turma!');
      return;
    }
    this.dialog.open(ActivitySubmissionDialogComponent, {
      data: {
        classId: this.classId,
        activityId: activity.id,
        classMemberId: classMemberId,
      },
      width: '400px',
    });
  }
}
