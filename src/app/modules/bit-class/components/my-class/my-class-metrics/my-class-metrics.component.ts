import {Component, OnInit} from '@angular/core';
import {TeacherPerformance} from '../../../../../shared/models/bit-class-models/teacher-performance';
import {GeneralService} from '../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {TeacherPerformanceHistory} from '../../../../../shared/models/bit-class-models/teacher-performance-history';
import {
  TeacherPerformanceDistribution
} from '../../../../../shared/models/bit-class-models/teacher-performance-distribution';
import {
  TeacherPerformanceRankingItem
} from '../../../../../shared/models/bit-class-models/teacher-performance-ranking-item';
import {MATERIAL_IMPORTS} from '../../../../../shared/imports/material.imports';
import {FormsModule} from '@angular/forms';
import {
  TeacherPerformanceHistoryComponent
} from '../components/teacher-performance-history/teacher-performance-history.component';
import {
  TeacherPerformanceDistributionComponent
} from '../components/teacher-performance-distribution/teacher-performance-distribution.component';
import {
  TeacherPerformanceComparisonComponent
} from '../components/teacher-performance-comparison/teacher-performance-comparison.component';

@Component({
  selector: 'app-my-class-metrics',
  imports: [
    ...MATERIAL_IMPORTS,
    FormsModule,
    TeacherPerformanceHistoryComponent,
    TeacherPerformanceDistributionComponent,
    TeacherPerformanceComparisonComponent,
  ],
  templateUrl: './my-class-metrics.component.html',
  styleUrl: './my-class-metrics.component.scss'
})
export class MyClassMetricsComponent implements OnInit {
  public teacherPerformance: TeacherPerformance | null = null;
  public history: TeacherPerformanceHistory | null = null;
  public distribution: TeacherPerformanceDistribution | null = null;
  public ranking: TeacherPerformanceRankingItem[] = [];
  public period = { start: '', end: '' };

  // Echarts configs
  public activitiesLineOptions: any = {};
  public gradesLineOptions: any = {};
  public barClassOptions: any = {};
  public pieDistributionOptions: any = {};

  public loading = false;

  constructor(
    private generalService: GeneralService,
    private endpoint: EndpointsService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.period.start = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString().slice(0, 10); // 6 meses atrás
    this.period.end = now.toISOString().slice(0, 10);
    this.loadDashboard();
  }

  public loadDashboard(): void {
    this.loading = true;
    this.getTeacherPerformance();
    this.getHistory();
    this.getDistribution();
    this.getRanking();
  }

  public onPeriodChange(): void {
    this.loadDashboard();
  }

  private getTeacherPerformance(): void {
    const url = this.endpoint.path.teacherPerformance;
    this.generalService.get(url).subscribe({
      next: (data: TeacherPerformance) => this.teacherPerformance = data
    });
  }

  private getHistory(): void {
    const url = this.endpoint.path.teacherPerformanceHistory;
    this.generalService.getWithParams<TeacherPerformanceHistory>(url, {
      start_date: this.period.start,
      end_date: this.period.end
    }).subscribe({
      next: (data) => {
        this.history = data;
        this.setupActivitiesLineChart();
        this.setupGradesLineChart();
      }
    });
  }

  private getDistribution(): void {
    const url = this.endpoint.path.teacherPerformanceDistribution;
    this.generalService.get(url).subscribe({
      next: (data: TeacherPerformanceDistribution) => {
        this.distribution = data;
        this.setupPieDistributionChart();
        this.setupBarClassChart();
      }
    });
  }

  private getRanking(): void {
    const url = this.endpoint.path.teacherPerformanceRanking;
    this.generalService.getWithParams<TeacherPerformanceRankingItem[]>(url, {
      start_date: this.period.start,
      end_date: this.period.end
    }).subscribe({
      next: (data) => this.ranking = data,
      complete: () => { this.loading = false; }
    });
  }

  // Charts config
  private setupActivitiesLineChart(): void {
    if (!this.history) return;
    this.activitiesLineOptions = {
      title: { text: 'Evolução de Atividades', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.history.months },
      yAxis: { type: 'value' },
      series: [{
        data: this.history.activities,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        areaStyle: { color: '#e3f2fd' },
        lineStyle: { color: '#2196f3', width: 3 }
      }]
    };
  }

  private setupGradesLineChart(): void {
    if (!this.history) return;
    this.gradesLineOptions = {
      title: { text: 'Média de Notas por Mês', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.history.months },
      yAxis: { type: 'value', max: 100 },
      series: [{
        data: this.history.average_grades,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        areaStyle: { color: '#ede7f6' },
        lineStyle: { color: '#7c4dff', width: 3 }
      }]
    };
  }

  private setupPieDistributionChart(): void {
    if (!this.distribution) return;
    this.pieDistributionOptions = {
      title: { text: 'Distribuição de Alunos', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'right', data: this.distribution.labels },
      series: [{
        name: 'Alunos',
        type: 'pie',
        radius: '60%',
        data: this.distribution.labels.map((label, i) => ({
          value: this.distribution?.values[i], name: label
        })),
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.2)' }
        }
      }]
    };
  }

  private setupBarClassChart(): void {
    if (!this.distribution) return;
    this.barClassOptions = {
      title: { text: 'Alunos por Sala', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.distribution.labels },
      yAxis: { type: 'value' },
      series: [{
        data: this.distribution.values,
        type: 'bar',
        barWidth: '45%',
        itemStyle: { color: '#00bcd4' }
      }]
    };
  }
}
