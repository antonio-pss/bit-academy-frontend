import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  ClassroomStudentsComponent
} from '../../../../bit-class/components/classroom/classroom-students/classroom-students.component';

@Component({
  selector: 'app-list-students',
  imports: [
    FormsModule,
    ClassroomStudentsComponent
  ],
  templateUrl: './list-students.component.html',
  styleUrl: './list-students.component.scss'
})
export class ListStudentsComponent  {

}
