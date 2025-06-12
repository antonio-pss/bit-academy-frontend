import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudentDetailDialogComponent } from './student-detail-dialog/student-detail-dialog.component';
import { StudentItemDialogComponent } from './student-item-dialog/student-item-dialog.component';
import { GeneralService } from '../../../../../shared/services/general.service';
import { EndpointsService } from '../../../../../shared/services/endpoints.service';
import { MATERIAL_IMPORTS } from '../../../../../shared/imports/material.imports';
import { FormsModule } from '@angular/forms';
import { ClassMember, ClassMemberRole } from '../../../../../shared/models/bit-class-models/class-member';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.scss'],
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    MatIcon,
    FormsModule,
  ]
})
export class ClassroomStudentsComponent implements OnInit {
  public searchTerm = '';
  public member: ClassMember = {} as ClassMember;
  public students: ClassMember[] = [];
  public filteredStudents: ClassMember[] = [];
  public currentUserId: number;
  public currentUserClassMemberId: number | null = null;

  public attendance: { [classMemberId: number]: boolean } = {};
  public attendanceDate: string = this.todayISO();
  public attendanceSentDate: string | null = null;

  public attendanceLoaded = false;
  public attendanceExists = false;
  public attendanceIds: number[] = [];


  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
  ) {
    this.currentUserId = this.generalService.userId;
  }

  public displayedColumns: string[] = ['name', 'email', 'role', 'attendance', 'actions'];

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
          this.toastr.error('Não é permitido remover o professor da sala.');
          console.error(err);
        }
      });
    return this.students;
  }

  public isCurrentUserProfessor(student: ClassMember): boolean {
    return (
      student.user?.id === this.currentUserId &&
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
      .list(this.endpoint.path.classMembers(this.classId))
      .subscribe({
        next: (members) => {
          this.students = members;
          this.filteredStudents = [...members];
          const member = members.find((m: ClassMember) => m.user?.id === this.currentUserId);
          this.currentUserClassMemberId = member?.id ?? null;
          this.students.forEach(s => {
            if (s.role === ClassMemberRole.STUDENTS && !(s.id in this.attendance)) {
              this.attendance[s.id] = false; // padrão: AUSENTE
            }
          });
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
      (s.user?.name ?? '').toLowerCase().includes(t)
    );
  }

  public openStudentDialog(student: any) {
    this.dialog.open(StudentDetailDialogComponent, {
      width: '600px',
      data: { student },
      disableClose: true,
    }).afterClosed().subscribe(result => {
      if (result) {
        const idx = this.students.findIndex(s => s.id === result.id);
        if (idx >= 0) {
          this.students[idx] = result;
          this.fetchStudents();
        }
      }
    });
  }

  public openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentItemDialogComponent, {
      width: '600px',
      data: { classId: this.classId },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((member) => {
      if (member) {
        this.students = [...this.students, member];
        this.fetchStudents();
      }
    });
  }

  public toggleAttendance(classMemberId: number, present: boolean) {
    this.attendance[classMemberId] = present;
  }

  private todayISO(): string {
    return new Date().toISOString().substring(0, 10);
  }

  public get attendanceButtonDisabled(): boolean {
    return this.attendanceSentDate === this.attendanceDate;
  }

  public onAttendanceDateChange() {
    this.attendanceLoaded = false;
    this.attendanceExists = false;
    this.attendanceIds = [];
    // Limpa estado local
    this.students.forEach(s => {
      if (s.role === ClassMemberRole.STUDENTS) {
        this.attendance[s.id] = false;
      }
    });

    // Só faz a chamada se já sabe o id do membro do professor
    if (this.currentUserClassMemberId) {
      this.generalService
        .list(
          this.endpoint.path.classAttendance(this.classId)
          + `?date=${this.attendanceDate}&registered_by=${this.currentUserClassMemberId}`
        )
        .subscribe({
          next: (attendances: any[]) => {
            if (attendances.length > 0) {
              // Já existe chamada nessa data
              this.attendanceExists = true;
              this.attendanceIds = attendances.map(a => a.id);
              attendances.forEach(a => {
                this.attendance[a.class_member] = a.is_present;
              });
            } else {
              // Não existe chamada nessa data
              this.attendanceExists = false;
            }
            this.attendanceLoaded = true;
          },
          error: () => { this.attendanceLoaded = true; }
        });
    } else {
      this.attendanceLoaded = true;
      this.attendanceExists = false;
    }
  }


  public sendAttendance() {
    const attendances = this.students
      .filter(s => s.role === ClassMemberRole.STUDENTS)
      .map(s => ({ [s.id]: !!this.attendance[s.id] }));

    const body = {
      date: this.attendanceDate,
      attendances
    };

    this.generalService.post(
      this.endpoint.path.attendanceBulk(this.classId),
      body
    ).subscribe({
      next: () => {
        this.toastr.success('Chamada registrada com sucesso!');
        this.attendanceSentDate = this.attendanceDate;
      },
      error: (err) => {
        this.toastr.error('Erro ao registrar chamada.');
        console.error(err);
      }
    });
  }
}
