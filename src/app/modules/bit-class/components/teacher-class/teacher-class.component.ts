import {Component, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-teacher-class',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    FormsModule,
    ClassCardComponent,
  ],
  templateUrl: './teacher-class.component.html',
  styleUrl: './teacher-class.component.scss'
})
export class TeacherClassComponent {
  public displayedClasses: Class[] = [];
  public filteredClasses: Class[] = [];
  public paginatedClasses: Class[] = [];
  public searchTerm = '';
  public itemsPerPage: number = 5;
  public currentPageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private classService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadTeacherClasses();
  }

  public loadTeacherClasses(): void {
    this.classService.get(this.endpoint.path.myTeacherClass).subscribe({
      next: (members: ClassMember[]) => {
        this.displayedClasses = members.map(m => m.class_id);
        this.filteredClasses = [...this.displayedClasses];
        this.updatePaginatedClasses();
      },
      error: (error) => {
        console.error('Erro ao carregar classes do professor:', error);
        this.toastr.error('Erro ao carregar suas salas como professor');
      }
    });
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
    const search = this.searchTerm.trim().toLowerCase();
    if (!search) {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter(cls =>
        cls?.name?.toLowerCase().includes(search)
      );
    }
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }

  public onNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
