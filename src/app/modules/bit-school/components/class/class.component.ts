import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {Class} from '../../../../shared/models/bit-class-models/class';
import {Course} from '../../../../shared/models/bit-school-models/course';
import {GeneralService} from '../../../../shared/services/general.service';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {ToastrService} from 'ngx-toastr';
import {ClassCardComponent} from '../../../bit-class/components/home/class-list/class-card/class-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {
  ClassItemDialogComponent
} from '../../../bit-class/components/home/class-list/class-item-dialog/class-item-dialog.component';

@Component({
  selector: 'app-class',
  imports: [
    MATERIAL_IMPORTS,
    ClassCardComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent implements OnInit {
  public courses: Course[] = [];

  // constructor(
  //   private generalService: GeneralService,
  //   private endpointService: EndpointsService,
  //   private toastr: ToastrService
  // ) {}


  // ngOnInit(): void {
  //   this.getCourses();
  // }


  // public getCourses(): void {
  //   const path = this.endpointService.path.bitSchoolCourses;
  //
  //   this.generalService.get(path).subscribe({
  //     next: (courses: Course[]) => {
  //       this.courses = courses;
  //       this.toastr.success('Turmas carregadas com sucesso!');
  //     },
  //     error: (error) => {
  //       console.error('Erro ao carregar as turmas:', error);
  //       this.toastr.error('Erro ao carregar as turmas');
  //     }
  //   });
  // }


  //aqui vai listar as salas
  @Output() open = new EventEmitter<boolean>();

  public displayedClasses: Class[] = [];
  public filteredClasses: Class[] = [];
  public paginatedClasses: Class[] = [];
  public searchTerm: string = '';
  public itemsPerPage: number = 5;
  public currentPageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private readonly classService: GeneralService,
    private readonly toastr: ToastrService,
    private readonly endpoint: EndpointsService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  public updatePaginatedClasses(): void {
    const startIndex = this.currentPageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClasses = this.filteredClasses.slice(startIndex, endIndex);
  }

  public onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.updatePaginatedClasses();
  }

  public onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }


  public onChangeStatus(event: MatSelectChange): void {
    const selectedStatus = event.value;
    if (selectedStatus === 'all') {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter((item) => item.active === selectedStatus);
    }
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }


  public loadClasses() {
    this.classService.get(this.endpoint.path.class).subscribe({
      next: (classes: Class[]) => {
        this.displayedClasses = classes;
        this.filteredClasses = [...this.displayedClasses];
        this.updatePaginatedClasses();
      },
      error: (error) => {
        console.error('Erro ao carregar classes:', error);
        this.toastr.error('Erro ao carregar as salas');
      }
    });
  }


  public onNavigate(action: string) {
    return this.router.navigate([action]).then(
      () => {
        this.open.emit(false);
      },
      (error) => {
        console.error('Erro ao navegar:', error);
        this.toastr.error('Erro ao navegar para a página desejada');
      }
    );
  }


}
