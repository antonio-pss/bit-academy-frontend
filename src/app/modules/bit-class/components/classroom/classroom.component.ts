import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassroomStatCardComponent} from './components/classroom-stat-card/classroom-stat-card.component';
import {AttendanceItemComponent} from './components/attendance-item/attendance-item.component';
import {StudentCardComponent} from './components/student-card/student-card.component';
import {ActivityCardComponent} from './components/activity-card/activity-card.component';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {GeneralService} from '../../../../shared/services/general.service';
import {Classroom} from '../../../../shared/models/class';
import {ToastrService} from 'ngx-toastr';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {ClassroomSettingsComponent} from './classroom-settings/classroom-settings.component';
import {ClassroomStudentsComponent} from './classroom-students/classroom-students.component';

@Component({
  selector: 'app-classroom',
  imports: [
    ...MATERIAL_IMPORTS,
    ClassroomStatCardComponent,
    AttendanceItemComponent,
    ActivityCardComponent,
    StudentCardComponent,
    ClassroomSettingsComponent,
    ClassroomStudentsComponent,
  ],
  standalone: true,
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss'
})
export class ClassroomComponent implements OnInit {
  public attendanceList = [
    {name: 'Ana Maria', initials: 'AM', status: 'present'},
    {name: 'Bruno Silva', initials: 'BS', status: 'present'},
    {name: 'Carlos Rocha', initials: 'CR', status: 'late'},
    {name: 'Daniela Fernandes', initials: 'DF', status: 'absent'},
    {name: 'Eduardo Pereira', initials: 'EP', status: 'present'},
    {name: 'Fernanda Souza', initials: 'FS', status: 'present'}
  ];

  public activities = [
    {
      title: 'Prova Bimestral - Álgebra',
      description: 'Avaliação sobre equações do 2º grau e funções quadráticas',
      date: '15/06',
      completed: '0/32',
      status: 'pending'
    },
    {
      title: 'Trabalho em Grupo',
      description: 'Projeto sobre aplicações de funções no cotidiano',
      date: '22/06',
      completed: '5/32',
      status: 'pending'
    },
    {
      title: 'Lista de Exercícios',
      description: 'Exercícios sobre sistemas de equações',
      date: '10/06',
      completed: '25/32',
      status: 'overdue'
    }
  ];

  public topStudents = [
    {
      name: 'Ana Maria',
      initials: 'AM',
      average: '9.2',
      activitiesCompleted: '12/12',
      attendance: '100%',
      performance: 'excellent'
    },
    {
      name: 'Bruno Silva',
      initials: 'BS',
      average: '8.7',
      activitiesCompleted: '11/12',
      attendance: '95%',
      performance: 'good'
    },
    {
      name: 'Carlos Rocha',
      initials: 'CR',
      average: '8.5',
      activitiesCompleted: '12/12',
      attendance: '90%',
      performance: 'good'
    }
  ];

  public recentMaterials = [
    {
      title: 'Slides - Equações 2º Grau',
      description: 'Material de apoio para a próxima aula',
      date: '05/06',
      stats: '28 downloads',
      type: 'pdf'
    },
    {
      title: 'Vídeo Aulas Recomendadas',
      description: 'Links para complementar os estudos',
      date: '01/06',
      stats: '22 visualizações',
      type: 'link'
    },
    {
      title: 'Lista de Exercícios',
      description: 'Prática para a prova bimestral',
      date: '30/05',
      stats: '30 downloads',
      type: 'doc'
    }
  ];

  public studentList = [
    {
      id: 1,
      name: 'Ana Maria',
      initials: 'AM',
      status: 'present',
      average: 9.2,
      activitiesCompleted: '12/12',
      attendance: '100%',
    }
  ]

  public classroom?: Classroom

  constructor(
    private readonly routeActivatedRoute: ActivatedRoute,
    private readonly classroomService: GeneralService,
    private readonly toastr: ToastrService,
    private readonly endpointService: EndpointsService
  ) {
  }

  public get classId(): string {
    return this.routeActivatedRoute.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.getClassroom()
  }

  public getClassroom(): void {
    this.classroomService.getById(this.endpointService.path.classById, Number(this.classId)).subscribe({
      next: (classroom: Classroom) => {
        this.classroom = classroom;
        this.toastr.success('Turma carregada com sucesso!');
        console.log('Turma carregada com sucesso:', this.classroom);
      },
      error: (error) => {
        console.error('Erro ao carregar a turma:', error);
        this.toastr.error('Erro ao carregar a turma', '', {})
      }
    });
  }


}
