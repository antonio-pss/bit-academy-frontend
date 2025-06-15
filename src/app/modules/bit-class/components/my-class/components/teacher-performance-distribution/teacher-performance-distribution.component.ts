import {Component, OnInit} from '@angular/core';
import {EChartsCoreOption} from 'echarts';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {NgxEchartsDirective} from 'ngx-echarts';

@Component({
  selector: 'app-teacher-performance-distribution',
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './teacher-performance-distribution.component.html',
  styleUrl: './teacher-performance-distribution.component.scss'
})
export class TeacherPerformanceDistributionComponent implements OnInit {
  public pieOptions: import('echarts/core').EChartsCoreOption | null = null;

  constructor(
    private generalService: GeneralService,
    private endpoint: EndpointsService
  ) {}

  public ngOnInit(): void {
    this.loadDistribution();
  }

  private loadDistribution(): void {
    const url = this.endpoint.path.teacherPerformanceDistribution;
    this.generalService.getWithParams(url).subscribe({
      next: (data:any ) => {
        const parsed = data as { labels: string[]; values: number[] };
        this.pieOptions = this.buildPieChart(parsed.labels, parsed.values);
      }
    });
  }

  private buildPieChart(labels: string[], values: number[]): EChartsCoreOption {
    return {
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { fontSize: 12 }
      },
      series: [
        {
          name: 'Alunos por Sala',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: labels.map((label, index) => ({
            value: values[index],
            name: label
          }))
        }
      ]
    };
  }
}
