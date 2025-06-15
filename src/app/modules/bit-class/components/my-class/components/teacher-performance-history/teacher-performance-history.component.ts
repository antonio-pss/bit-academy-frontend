import {Component, OnInit} from '@angular/core';
import {EChartsCoreOption, EChartsOption} from 'echarts';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {NgxEchartsDirective} from 'ngx-echarts';

@Component({
  selector: 'app-teacher-performance-history',
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './teacher-performance-history.component.html',
  styleUrl: './teacher-performance-history.component.scss'
})

export class TeacherPerformanceHistoryComponent implements OnInit {
  public chartOptions: import('echarts/core').EChartsCoreOption | null = null;
  public loading = true;

  constructor(
    private generalService: GeneralService,
    private endpoint: EndpointsService
  ) {
  }

  public ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    const url = this.endpoint.path.teacherPerformanceHistory;
    this.generalService.getWithParams(url).subscribe({
      next: (response) => {
        const data = response as {
          months: string[];
          activities: number[];
          average_grades: number[];
        };
        this.chartOptions = this.buildChartOptions(data.months, data.activities, data.average_grades);
        this.loading = false;
      }
    });
  }

  private buildChartOptions(months: string[], activities: number[], grades: number[]): EChartsOption {
    return {
      tooltip: {trigger: 'axis'},
      legend: {data: ['Atividades', 'Média de Notas']},
      xAxis: {type: 'category', data: months},
      yAxis: [
        {type: 'value', name: 'Atividades'},
        {type: 'value', name: 'Nota', min: 0, max: 100}
      ],
      series: [
        {
          name: 'Atividades',
          type: 'line',
          data: activities,
          yAxisIndex: 0,
          smooth: true
        },
        {
          name: 'Média de Notas',
          type: 'line',
          data: grades,
          yAxisIndex: 1,
          smooth: true
        }
      ]
    };
  }
}
