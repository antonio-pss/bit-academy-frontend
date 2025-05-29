import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-attendance-item',
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './attendance-item.component.html',
  styleUrl: './attendance-item.component.scss'
})
export class AttendanceItemComponent {
    @Input() student!: any;

}
