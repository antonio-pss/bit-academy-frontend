import { Component } from '@angular/core';
import {
  ClassroomStudentsComponent
} from '../../../../bit-class/components/classroom/classroom-students/classroom-students.component';

@Component({
  selector: 'app-list-students',
  imports: [
    ClassroomStudentsComponent
  ],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss'
})
export class ListStudentsComponent {

}
