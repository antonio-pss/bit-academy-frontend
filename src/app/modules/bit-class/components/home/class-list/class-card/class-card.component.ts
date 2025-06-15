import {Component, Input, OnInit} from '@angular/core';
import {ClassMetrics} from '../../../../../../shared/models/bit-class-models/class-metrics';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {DecimalPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-class-card',
  templateUrl: './class-card.component.html',
  imports: [
    MATERIAL_IMPORTS,
    DecimalPipe,
    MatProgressBar,
  ],
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() classroom!: any;

  public metrics?: ClassMetrics;
  public loading = false;
  public donutOptions: any = {};

  constructor(
    private readonly generalService: GeneralService,
    private readonly endpoint: EndpointsService
  ) {
  }

  public ngOnInit(): void {
    this.getClassMetrics();
  }

  private getClassMetrics(): void {
    this.loading = true;
    const url = this.endpoint.path.classMetrics(this.classroom.id);
    this.generalService.get(url).subscribe({
      next: (data: ClassMetrics) => {
        this.metrics = data;
        this.loading = false;
        this.updateDonut();
      },
      error: () => {
        this.metrics = undefined;
        this.loading = false;
      }
    });
  }

  private updateDonut(): void {
    if (!this.metrics) {
      return;
    }
    this.donutOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['Média de Notas', 'Frequência (%)']
      },
      series: [
        {
          name: 'Desempenho',
          type: 'pie',
          radius: ['55%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: '{b}',
            fontSize: 14,
            fontWeight: 'bold'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {show: false},
          data: [
            {value: this.metrics.average_grade ?? 0, name: 'Média de Notas'},
            {value: this.metrics.attendance_rate ?? 0, name: 'Frequência (%)'}
          ]
        }
      ]
    };
  }

  public get daysOfWeek(): string {
    if (this.classroom?.days_display?.length > 0) {
      return this.classroom.days_display.join(', ');
    }
    return 'Não agendado';
  }
}
