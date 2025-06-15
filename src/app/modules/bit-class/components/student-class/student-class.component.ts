import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {FormsModule} from '@angular/forms';
import {Class} from '../../../../shared/models/bit-class-models/class';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {GeneralService} from '../../../../shared/services/general.service';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {ToastrService} from 'ngx-toastr';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';

@Component({
  selector: 'app-student-class',
  standalone: true,
  imports: [
    CommonModule,
    MATERIAL_IMPORTS,
    FormsModule
  ],
  templateUrl: './student-class.component.html',
  styleUrl: './student-class.component.scss'
})
export class StudentClassComponent {
  public displayedClasses: Class[] = [];
  public filteredClasses: Class[] = [];
  public paginatedClasses: Class[] = [];
  public searchTerm: string = '';
  public itemsPerPage: number = 5;
  public currentPageIndex: number = 0;
  private memberMap: Map<number, number> = new Map();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private classService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStudentClasses();
  }

  public loadStudentClasses(): void {
    this.classService.get(this.endpoint.path.myStudentClass).subscribe({
      next: (members: ClassMember[]) => {
        this.memberMap.clear();
        this.displayedClasses = members.map(m => {
          this.memberMap.set(m.class_id.id, m.id);
          return m.class_id;
        });
        this.filteredClasses = [...this.displayedClasses];
        this.updatePaginatedClasses();
      },
      error: (error) => {
        console.error('Erro ao carregar classes do aluno:', error);
        this.toastr.error('Erro ao carregar suas salas como aluno');
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
        cls.name.toLowerCase().includes(search)
      );
    }
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }

  public onLeaveClass(classId: number): void {
    const memberId = this.memberMap.get(classId);
    if (!memberId) {
      this.toastr.error('Não foi possível identificar sua participação nessa sala.');
      return;
    }

    const url = this.endpoint.path.classMemberDetail(classId, memberId);
    this.classService.onDelete(url).subscribe({
      next: () => {
        this.toastr.success('Você saiu da sala com sucesso');
        this.loadStudentClasses();
      },
      error: () => {
        this.toastr.error('Erro ao sair da sala');
      }
    });
  }
}
