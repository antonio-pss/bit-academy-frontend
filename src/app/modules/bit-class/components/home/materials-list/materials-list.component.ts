import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-materials-list',
  imports: [
    MatCard,
    MatCardHeader,
    MatButton
  ],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.scss'
})
export class MaterialsListComponent {
  @Output() create = new EventEmitter<boolean>();


  public onCreate(): void {
    this.create.emit(true);
  }
}
