import {Component, OnInit} from '@angular/core';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {EChartsCoreOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';

@Component({
  selector: 'app-teacher-performance-comparison',
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './teacher-performance-comparison.component.html',
  styleUrl: './teacher-performance-comparison.component.scss'
})
export class TeacherPerformanceComparisonComponent  implements OnInit {
  public barOptions: import('echarts/core').EChartsCoreOption | null = null;

  constructor(
    private generalService: GeneralService,
    private endpoint: EndpointsService
  ) {}

  public ngOnInit(): void {
    this.loadComparison();
  }

  private loadComparison(): void {
    const url = this.endpoint.path.teacherPerformanceComparison;
    this.generalService.getWithParams(url).subscribe({
      next: (data) => {
        const parsed = data as {
          labels: string[];
          attendance: number[];
          submissions: number[];
        };
        this.barOptions = this.buildBarChart(parsed.labels, parsed.attendance, parsed.submissions);
      }
    });
  }

  private buildBarChart(labels: string[], attendance: number[], submissions: number[]): EChartsCoreOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Frequência', 'Entregas'] },
      xAxis: {
        type: 'category',
        data: labels,
        axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: 'Frequência',
          type: 'bar',
          data: attendance,
          barWidth: '30%',
          itemStyle: {
            color: '#3B82F6'
          }
        },
        {
          name: 'Entregas',
          type: 'bar',
          data: submissions,
          barWidth: '30%',
          itemStyle: {
            color: '#10B981'
          }
        }
      ]
    };
  }
}
