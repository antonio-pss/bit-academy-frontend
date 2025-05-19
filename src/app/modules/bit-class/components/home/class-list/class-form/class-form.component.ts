import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogContainer} from '@angular/material/dialog';

@Component({
  selector: 'app-class-form',
  imports: [
    MatDialogContainer
  ],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss'
})
export class ClassFormComponent {
  @Output() onClose = new EventEmitter<boolean>();

}
