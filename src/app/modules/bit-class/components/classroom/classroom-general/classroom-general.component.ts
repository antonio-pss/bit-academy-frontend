import {Component, Input, OnInit} from '@angular/core';
import {ClassMetrics} from '../../../../../shared/models/bit-class-models/class-metrics';
import {GeneralService} from '../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {ClassMetricsComponent} from '../components/class-metrics/class-metrics.component';
import {ClassMiniStudentsComponent} from '../components/class-mini-students/class-mini-students.component';
import {ClassMember} from '../../../../../shared/models/bit-class-models/class-member';
import {ClassBestStudentsComponent} from '../components/class-best-students/class-best-students.component';
import {BestStudent} from '../../../../../shared/models/bit-class-models/best-students';
import {forkJoin, map} from 'rxjs';

@Component({
  selector: 'app-classroom-general',
  templateUrl: './classroom-general.component.html',
  imports: [
    ClassMetricsComponent,
    ClassMiniStudentsComponent,
    ClassBestStudentsComponent
  ],
  styleUrls: ['./classroom-general.component.scss']
})
export class ClassroomGeneralComponent implements OnInit {
  @Input({ required: true }) classId!: number;

  public metrics?: ClassMetrics;
  public students: ClassMember[] = [];
  public bestStudents: BestStudent[] = [];

  public loadingMetrics = false;
  public metricsError?: string;
  public loadingStudents = false;
  public studentsError?: string;
  public loadingBest = false;

  constructor(
    private readonly generalService: GeneralService,
    private readonly endpointService: EndpointsService,
  ) {}

  ngOnInit(): void {
    this.loadMetrics();
    this.loadStudents();
  }

  public loadMetrics(): void {
    this.loadingMetrics = true;
    this.metricsError = undefined;
    const url = this.endpointService.path.classMetrics(this.classId);
    this.generalService.get(url).subscribe({
      next: (metrics: ClassMetrics) => {
        this.metrics = metrics;
        this.loadingMetrics = false;
      },
      error: (err) => {
        this.metricsError = err?.message || 'Erro ao carregar métricas';
        this.loadingMetrics = false;
      }
    });
  }

  public loadStudents(): void {
    this.loadingStudents = true;
    this.studentsError = undefined;
    const url = this.endpointService.path.classDetail(this.classId);
    this.generalService.get(url).subscribe({
      next: (classDetail: any) => {
        this.students = classDetail.students || [];
        this.loadingStudents = false;
      },
      error: (err) => {
        this.studentsError = err?.message || 'Erro ao carregar alunos';
        this.loadingStudents = false;
      }
    });
  }

  public loadBestStudents(): void {
    if (!this.students?.length) return;
    this.loadingBest = true;
    const classId = this.classId;
    const metricRequests = this.students.map(student =>
      this.generalService.get(this.endpointService.path.classMemberMetrics(classId, student.id))
        .pipe(
          // Acrescenta os dados do aluno (nome, email, etc)
          map((metrics: any) => ({
            ...metrics,
            id: student.id,
            name: student.user.name,
            email: student.user.email,
            role: student.role,
          }))
        )
    );
    forkJoin(metricRequests).subscribe({
      next: (allMetrics: BestStudent[]) => {
        // Ordene por average_grade e pegue os melhores
        this.bestStudents = allMetrics
          .sort((a, b) => (b.average_grade ?? 0) - (a.average_grade ?? 0))
          .slice(0, 3); // top 3
        this.loadingBest = false;
      },
      error: () => {
        this.loadingBest = false;
      }
    });
  }

  public handleGoToTab(): void {
    // Troque para o método de navegação/seleção de aba de alunos/frequência!
  }
}
