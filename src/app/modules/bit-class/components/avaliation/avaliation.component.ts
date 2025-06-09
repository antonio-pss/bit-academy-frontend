import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../../shared/models/bit-class-models/activity';


@Component({
  selector: 'app-avaliation',
  standalone: true,
  templateUrl: './avaliation.component.html',
  styleUrls: ['./avaliation.component.scss']
})
export class AvaliationComponent  {
  public avaliations: Activity[] = [];

  constructor(
  ) {}

  // ngOnInit(): void {
  //   this.loadAvaliations();
  // }
  //
  // loadAvaliations(): void {
  //   this.generalService
  //     .list(this.endpoints.path.classActivities)
  //     .subscribe({
  //       next: (data: Activity[]) => this.avaliations = data,
  //       error: (err: unknown) => console.error('Erro ao buscar avaliações', err)
  //     });
  // }
}
