import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {ClassCardComponent} from './class-card/class-card.component';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogContainer} from '@angular/material/dialog';
import {ClassFormComponent} from './class-form/class-form.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  imports: [
    FormsModule,
    MatButton,
    ClassCardComponent,
    MatPaginator,
    MatFormField,
    MatIcon,
    MatSelect,
    MatOption,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule
  ],
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {
  @Output() open = new EventEmitter<boolean>();

  public displayedClasses: any[] = []; // Lista inicial de classes
  public filteredClasses: any[] = []; // Lista de classes após busca ou filtro
  public paginatedClasses: any[] = []; // Classes exibidas na página atual
  public searchTerm: string = ''; // Termo de busca
  public itemsPerPage: number = 5; // Itens por página
  public currentPageIndex: number = 0; // Índice da página atual

  protected readonly Math = Math;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog
  ) {
    // Exemplo de dados iniciais
    this.displayedClasses = [
      {
        id: 1,
        title: 'Math',
        schedule: 'Mon 9AM',
        studentCount: 30,
        gradeAverage: 85,
        assignmentsCount: 5,
        progressPercentage: 80,
        status: 'Active'
      },
      {
        id: 2,
        title: 'Science',
        schedule: 'Tue 10AM',
        studentCount: 28,
        gradeAverage: 90,
        assignmentsCount: 7,
        progressPercentage: 75,
        status: 'Active'
      },
      {
        id: 3,
        title: 'History',
        schedule: 'Wed 11AM',
        studentCount: 25,
        gradeAverage: 88,
        assignmentsCount: 10,
        progressPercentage: 60,
        status: 'Pending'
      },
      {
        id: 4,
        title: 'Physics',
        schedule: 'Thu 1PM',
        studentCount: 24,
        gradeAverage: 92,
        assignmentsCount: 8,
        progressPercentage: 70,
        status: 'Overdue'
      },
      {
        id: 5,
        title: 'Chemistry',
        schedule: 'Fri 2PM',
        studentCount: 29,
        gradeAverage: 95,
        assignmentsCount: 12,
        progressPercentage: 85,
        status: 'Active'
      },
      {
        id: 6,
        title: 'Biology',
        schedule: 'Sat 10AM',
        studentCount: 27,
        gradeAverage: 89,
        assignmentsCount: 6,
        progressPercentage: 50,
        status: 'Overdue'
      }
    ];

    this.filteredClasses = [...this.displayedClasses];
    this.updatePaginatedClasses();
  }

  /**
   * Atualiza os dados paginados com base na página atual e no número de itens por página
   */
  public updatePaginatedClasses(): void {
    const startIndex = this.currentPageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClasses = this.filteredClasses.slice(startIndex, endIndex);
  }

  /**
   * Gerencia a troca de página quando o paginator dispara o evento (página ou tamanho).
   * @param event Evento de mudança gerado pelo paginator.
   */
  public onPageChange(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.updatePaginatedClasses();
  }

  /**
   * Filtra as classes com base no termo de busca fornecido pelo usuário.
   */
  public onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter((item) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    // Reinicia o paginator após uma nova busca
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }

  /**
   * Aplica um filtro às classes com base no status selecionado.
   * @param event Evento de alteração do select
   */
  public onChangeStatus(event: MatSelectChange): void {
    const selectedStatus = event.value;

    if (selectedStatus === 'All Classes') {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter((item) => item.status === selectedStatus);
    }
    // Reinicia o paginator após a mudança de filtro
    this.currentPageIndex = 0;
    this.paginator.firstPage();
    this.updatePaginatedClasses();
  }

  // Exemplos de ações futuras
  public isOpen(): void {
    this.open.emit(true);
  }

  public onClose() {
    this.open.emit(false);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.componentInstance.onClose.subscribe(() => {
      dialogRef.close();
      // Adicione lógica adicional aqui, se necessário
    });
  }

  protected readonly ClassFormComponent = ClassFormComponent;
}
