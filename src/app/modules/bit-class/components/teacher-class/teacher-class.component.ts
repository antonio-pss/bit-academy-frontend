import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Class } from '../../../../shared/models/bit-class-models/class';
import {ToastrService} from 'ngx-toastr';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {GeneralService} from '../../../../shared/services/general.service';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {ClassCardComponent} from '../home/class-list/class-card/class-card.component';
import {TeacherPerformance} from '../../../../shared/models/bit-class-models/teacher-performance';
import {MatDialog} from '@angular/material/dialog';
import {ClassItemDialogComponent} from '../home/class-list/class-item-dialog/class-item-dialog.component';
import {MyClassGeneralComponent} from '../my-class/my-class-general/my-class-general.component';
import {MyClassMetricsComponent} from '../my-class/my-class-metrics/my-class-metrics.component';
import {TeacherKpiCardsComponent} from '../my-class/components/teacher-kpi-cards/teacher-kpi-cards.component';

@Component({
  selector: 'app-teacher-class',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    FormsModule,
    ClassCardComponent,
    MyClassGeneralComponent,
    MyClassMetricsComponent,
    TeacherKpiCardsComponent,
  ],
  templateUrl: './teacher-class.component.html',
  styleUrl: './teacher-class.component.scss'
})
export class TeacherClassComponent implements OnInit{
  @Output() open = new EventEmitter<boolean>();

  public teacherPerformance: TeacherPerformance | null = null;

  public classes: Class[] = [];
  public filteredClasses: Class[] = [];
  public paginatedClasses: Class[] = [];
  public weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  public searchTerm = '';
  public status = 'all';
  public filtroDiaSemana: string | null = null;
  public totalSalas = 0;
  public totalAlunos = 0;
  public atividadesNoMes = 0;
  public mediaDesempenho = 0;
  public mediaFrequencia = 0;

  constructor(
    private dialog: MatDialog,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.applyFilters();
    this.getTeacherPerformance();
  }

  public onSearch(): void {
    this.applyFilters();
  }

  public onChangeStatus(event: any): void {
    this.status = event.value;
    this.applyFilters();
  }

  public onChangeDay(day: string | null): void {
    this.filtroDiaSemana = day;
    this.applyFilters();
  }

  public applyFilters(): void {
    // Monta o objeto de filtros para o endpoint
    const params: any = {};

    if (this.searchTerm) params.name = this.searchTerm;
    if (this.status && this.status !== 'all') params.active = (this.status === 'Active');
    if (this.filtroDiaSemana) params.days_per_week = this.filtroDiaSemana;

    const url = this.endpoint.path.advancedFilterClass;
    this.generalService.getWithParams<Class[]>(url, params).subscribe({
      next: (classes) => {
        this.classes = classes;
        this.filteredClasses = classes;
        this.updateDashboardMetrics();
        this.updatePagination();
      }
    });
  }

  public getTeacherPerformance(): void {
    const url = this.endpoint.path.teacherPerformance;
    this.generalService.get(url).subscribe({
      next: (data: TeacherPerformance) => {
        this.teacherPerformance = data;
      }
    });
  }

  public updateDashboardMetrics(): void {
    this.totalSalas = this.filteredClasses.length;
    this.totalAlunos = this.filteredClasses.reduce((sum, sala) => sum + (sala.total_students ?? 0), 0);
    this.atividadesNoMes = this.filteredClasses.reduce((sum, sala) => sum + (sala.total_activities ?? 0), 0);
    this.mediaDesempenho = this.filteredClasses.length
      ? this.filteredClasses.reduce((sum, sala) => sum + (sala.average_grade ?? 0), 0) / this.filteredClasses.length
      : 0;
    this.mediaFrequencia = this.filteredClasses.length
      ? this.filteredClasses.reduce((sum, sala) => sum + (sala.attendance_rate ?? 0), 0) / this.filteredClasses.length
      : 0;
  }

  public updatePagination(): void {
    // Implemente sua lógica de paginação (pode ser slice do array)
    this.paginatedClasses = this.filteredClasses.slice(0, 10); // exemplo fixo
  }

  public onPageChange(event: any): void {
    // Atualize sua lógica de paginação aqui conforme seu projeto
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.paginatedClasses = this.filteredClasses.slice(start, end);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ClassItemDialogComponent, {
      width: '480px', // ajuste se preferir
      data: {} // passe dados iniciais se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.applyFilters(); // recarrega lista após criar
      }
    });
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then()
  }
  // public displayedClasses: Class[] = [];
  // public filteredClasses: Class[] = [];
  // public paginatedClasses: Class[] = [];
  // public searchTerm = '';
  // public itemsPerPage: number = 5;
  // public currentPageIndex: number = 0;
  //
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  // constructor(
  //   private classService: GeneralService,
  //   private endpoint: EndpointsService,
  //   private toastr: ToastrService,
  //   private router: Router,
  // ) {}
  //
  // ngOnInit(): void {
  //   this.loadTeacherClasses();
  // }
  //
  // public loadTeacherClasses(): void {
  //   this.classService.get(this.endpoint.path.myTeacherClass).subscribe({
  //     next: (members: ClassMember[]) => {
  //       this.displayedClasses = members.map(m => m.class_id);
  //       this.filteredClasses = [...this.displayedClasses];
  //       this.updatePaginatedClasses();
  //     },
  //     error: (error) => {
  //       console.error('Erro ao carregar classes do professor:', error);
  //       this.toastr.error('Erro ao carregar suas salas como professor');
  //     }
  //   });
  // }
  //
  // public updatePaginatedClasses(): void {
  //   const startIndex = this.currentPageIndex * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.paginatedClasses = this.filteredClasses.slice(startIndex, endIndex);
  // }
  //
  // public onPageChange(event: PageEvent): void {
  //   this.itemsPerPage = event.pageSize;
  //   this.currentPageIndex = event.pageIndex;
  //   this.updatePaginatedClasses();
  // }
  //
  // public onSearch(): void {
  //   const search = this.searchTerm.trim().toLowerCase();
  //   if (!search) {
  //     this.filteredClasses = [...this.displayedClasses];
  //   } else {
  //     this.filteredClasses = this.displayedClasses.filter(cls =>
  //       cls?.name?.toLowerCase().includes(search)
  //     );
  //   }
  //   this.currentPageIndex = 0;
  //   this.paginator.firstPage();
  //   this.updatePaginatedClasses();
  // }
  //
  // public onNavigate(route: string): void {
  //   this.router.navigate([route]);
  // }
}
