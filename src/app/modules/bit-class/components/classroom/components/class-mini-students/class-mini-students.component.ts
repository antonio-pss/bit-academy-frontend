import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClassMember, ClassMemberRole} from '../../../../../../shared/models/bit-class-models/class-member';

@Component({
  selector: 'app-class-mini-students',
  imports: [],
  templateUrl: './class-mini-students.component.html',
  styleUrl: './class-mini-students.component.scss'
})
export class ClassMiniStudentsComponent {
  @Input({ required: true }) students: ClassMember[] = [];
  @Output() goToTab = new EventEmitter<void>();

  public readonly roleLabels: Record<ClassMemberRole, string> = {
    [ClassMemberRole.STUDENTS]: 'Aluno',
    [ClassMemberRole.TEACHERS]: 'Professor',
    [ClassMemberRole.PRINCIPAL]: 'Gestor',
    [ClassMemberRole.TRAINEE]: 'Estagiário'
  };
}
