import {Component, OnInit} from '@angular/core';
import {TeacherPerformance} from '../../../../../../shared/models/bit-class-models/teacher-performance';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-teacher-kpi-cards',
  imports: [
    ...MATERIAL_IMPORTS,
    DecimalPipe
  ],
  templateUrl: './teacher-kpi-cards.component.html',
  styleUrl: './teacher-kpi-cards.component.scss'
})
export class TeacherKpiCardsComponent implements OnInit {
  public performance?: TeacherPerformance;

  constructor(
    private generalService: GeneralService,
    private endpoint: EndpointsService
  ) {}

  public ngOnInit(): void {
    this.getTeacherPerformance();
  }

  private getTeacherPerformance(): void {
    const url = this.endpoint.path.teacherPerformance;
    this.generalService.get(url).subscribe({
      next: (data: TeacherPerformance) => (this.performance = data)
    });
  }
}
