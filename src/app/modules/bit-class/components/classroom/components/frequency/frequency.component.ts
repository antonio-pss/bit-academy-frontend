import {Component} from '@angular/core';
import {ClassMember} from '../../../../../../shared/models/class-member';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-frequency',
  standalone: true,
  imports: [
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './frequency.component.html',
  styleUrl: './frequency.component.scss'
})
export class FrequencyComponent {

  public classMembers: ClassMember[] = [];

  public trackByIndex(index: number, item: any) {
    return index;
  }

  public onDateToda(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

}
