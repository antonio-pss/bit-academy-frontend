import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {GeneralService} from '../../../../shared/services/general.service';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {Class} from '../../../../shared/models/bit-class-models/class';
import {Activity} from '../../../../shared/models/bit-class-models/activity';
import {ActivityComponent} from './activity/activity.component';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {ActivityItemDialogComponent} from './activity/activity-item-dialog/activity-item-dialog.component';
import {ClassroomSettingsComponent} from './classroom-settings/classroom-settings.component';
import {ClassroomStudentsComponent} from './classroom-students/classroom-students.component';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';
import {ClassroomGeneralComponent} from './classroom-general/classroom-general.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss',
  standalone: true,
  imports: [
    ActivityComponent,
    ClassroomSettingsComponent,
    ClassroomStudentsComponent,
    ClassroomGeneralComponent,
    MATERIAL_IMPORTS
  ]
})
export class ClassroomComponent implements OnInit {
  public classroom?: Class;
  public classroomId!: number;
  public activities: Activity[] = [];
  public studentList: ClassMember[] = [];
  public topStudents: ClassMember[] = [];

  public today: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private classroomService: GeneralService,
    private toastr: ToastrService,
    private endpointService: EndpointsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.classroomId = Number(this.route.snapshot.params['id']);
    this.getClassroom();
    this.loadActivities();
    this.loadStudents();
    this.loadTopStudents();
  }

  public loadStudents() {
    const path = this.endpointService.path.classMembers(this.classroomId); // <-- é função!
    this.classroomService.get(path).subscribe({
      next: (data) => this.studentList = data,
      error: (err) => {
        console.error('Erro ao buscar alunos:', err);
        this.toastr.error('Erro ao buscar alunos');
      }
    });
  }

  public loadActivities(): void {
    const path = this.endpointService.path.classActivities(this.classroomId);
    this.classroomService.get(path).subscribe({
      next: (data) => this.activities = data,
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao buscar atividades');
      }
    });
  }

  public loadTopStudents() {
    // Reutilize os alunos já carregados ou faça um GET específico se seu backend fornecer.
    // Aqui vamos usar os 3 primeiros só como exemplo.
    this.topStudents = this.studentList.slice(0, 3);
  }

  public getClassroom(): void {
    // path.classDetail é uma função!
    const path = this.endpointService.path.classDetail(this.classroomId);
    this.classroomService.get(path).subscribe({
      next: (classroom: Class) => {
        this.classroom = classroom;
        this.toastr.success('Turma carregada com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao carregar a turma:', error);
        this.toastr.error('Erro ao carregar a turma');
      }
    });
  }

  public openActivityDialog(): void {
    const dialogRef = this.dialog.open(ActivityItemDialogComponent, {
      data: { classId: this.classroomId },
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.loadActivities();
      }
    });
  }
}
