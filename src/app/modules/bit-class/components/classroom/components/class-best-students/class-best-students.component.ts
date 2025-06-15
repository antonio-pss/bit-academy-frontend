import {Component, Input} from '@angular/core';
import {BestStudent} from '../../../../../../shared/models/bit-class-models/best-students';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-class-best-students',
  imports: [
    DecimalPipe
  ],
  templateUrl: './class-best-students.component.html',
  styleUrl: './class-best-students.component.scss'
})
export class ClassBestStudentsComponent {
  @Input({ required: true }) bestStudents: BestStudent[] = [];
}
