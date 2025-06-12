import { Component } from '@angular/core';
import {ListStudentsComponent} from '../home/list-students/list-students.component';

@Component({
  selector: 'app-students',
  imports: [
    ListStudentsComponent
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

}
