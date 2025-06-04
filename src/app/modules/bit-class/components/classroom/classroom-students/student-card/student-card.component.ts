import {Component, Input} from '@angular/core';
import {ClassMember} from '../../../../../../shared/models/class-member';

@Component({
  selector: 'app-student-card',
  imports: [],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input() student!: ClassMember;

}
