import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudentDetailDialogComponent } from './student-detail-dialog/student-detail-dialog.component';
import { StudentItemDialogComponent } from './student-item-dialog/student-item-dialog.component';
import { GeneralService } from '../../../../../shared/services/general.service';
import { EndpointsService } from '../../../../../shared/services/endpoints.service';
import { MATERIAL_IMPORTS } from '../../../../../shared/imports/material.imports';
import { FormsModule } from '@angular/forms';
import { StudentCardComponent } from './student-card/student-card.component';
import { ClassMember, ClassMemberRole } from '../../../../../shared/models/bit-class-models/class-member';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.scss'],
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    FormsModule,
    StudentCardComponent,
  ]
})
export class ClassroomStudentsComponent implements OnInit {
  public searchTerm = '';
  public member: ClassMember = {} as ClassMember;
  public students: ClassMember[] = [];
  public filteredStudents: ClassMember[] = [];
  public currentUserId: number;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
  ) {
    this.currentUserId = this.generalService.userId;
  }

  public displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  public removeStudent(student: ClassMember) {
    if (student.role === ClassMemberRole.TEACHERS) {
      this.toastr.error('Não é permitido remover o professor da sala.');
      return;
    }
    this.generalService
      .onDelete(this.endpoint.path.classMemberDetail(this.classId, student.id))
      .subscribe({
        next: () => {
          this.toastr.success('Aluno removido da sala com sucesso!');
          this.students = this.students.filter(s => s.id !== student.id);
          this.onSearch();
        },
        error: (err) => {
          this.toastr.error('Membro não encontrado na sala.');
          console.error(err);
        }
      });
  }

  public isCurrentUserProfessor(student: ClassMember): boolean {
    return (
      student.user_id?.id === this.currentUserId &&
      student.role === ClassMemberRole.TEACHERS
    );
  }

  ngOnInit() {
    this.fetchStudents();
  }

  public get classId(): number {
    return Number(this.activatedRoute.snapshot.params['id']);
  }

  public fetchStudents() {
    this.generalService
      .get(this.endpoint.path.classMembers(this.classId))
      .subscribe({
        next: (members) => {
          this.students = members;
          this.filteredStudents = [...members];
        }
      });
  }

  public onSearch() {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) {
      this.filteredStudents = [...this.students];
      return;
    }
    this.filteredStudents = this.students.filter(s =>
      (s.user_id?.name ?? '').toLowerCase().includes(t)
    );
  }

  public openStudentDialog(student: any) {
    this.dialog.open(StudentDetailDialogComponent, {
      width: '600px',
      data: {student},
      disableClose: true,
    }).afterClosed().subscribe(result => {
      if (result) {
        const idx = this.students.findIndex(s => s.id === result.id);
        if (idx >= 0) {
          this.students[idx] = result;
          this.onSearch();
        }
      }
    });
  }

  public openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentItemDialogComponent, {
      width: '600px',
      data: {classId: this.classId},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newStudent) => {
      if (newStudent) {
        // Adiciona o novo aluno à lista existente
        this.students = [...this.students, newStudent];
        this.onSearch(); // Atualiza a lista filtrada
      }
    });
  }

}
