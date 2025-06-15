import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TeacherPerformance} from '../../../../../shared/models/bit-class-models/teacher-performance';
import {Class} from '../../../../../shared/models/bit-class-models/class';
import {MatDialog} from '@angular/material/dialog';
import {GeneralService} from '../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ClassItemDialogComponent} from '../../home/class-list/class-item-dialog/class-item-dialog.component';
import {ClassCardComponent} from '../../home/class-list/class-card/class-card.component';
import {FormsModule} from '@angular/forms';
import {MATERIAL_IMPORTS} from '../../../../../shared/imports/material.imports';

@Component({
  selector: 'app-my-class-general',
  imports: [ClassCardComponent,
    FormsModule,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './my-class-general.component.html',
  styleUrl: './my-class-general.component.scss'
})
export class MyClassGeneralComponent implements OnInit {
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
}
