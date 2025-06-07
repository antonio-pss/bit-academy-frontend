import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudentDetailDialogComponent } from './student-detail-dialog/student-detail-dialog.component';
import { StudentItemDialogComponent } from './student-item-dialog/student-item-dialog.component';
import {GeneralService} from '../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../shared/imports/material.imports';
import {FormsModule} from '@angular/forms';
import {StudentCardComponent} from './student-card/student-card.component';
import {ClassMember} from '../../../../../shared/models/bit-class-models/class-member';

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
  public students: ClassMember[] = [];
  public filteredStudents: ClassMember[] = [];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
  ) {}

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
      data: { student },
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
      data: { classId: this.classId },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.fetchStudents();
      }
    });
  }
}
