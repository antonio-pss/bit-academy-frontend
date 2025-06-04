import {Injectable} from '@angular/core';
import {URLS} from '../urls';


@Injectable({
  providedIn: 'root'
})

/* Exemplo de uso
this.endpoints.path.classDetail(classId)
this.endpoints.path.classMembers(classId)
this.endpoints.path.addStudent(classId)
this.endpoints.path.classActivityDetail(classId, activityId)
this.endpoints.path.attendanceReport(classId)
*/



export class EndpointsService {
  public readonly path = {
    // Authentication
    loginUser: URLS.AUTH.LOGIN,
    signUpUser: URLS.AUTH.SIGNUP,
    refreshToken: URLS.AUTH.REFRESH,

    // User Actions
    user: URLS.USER,

    // Class actions
    classById: URLS.CLASS,
    class: URLS.BIT_CLASS.NEW,                         // GET (lista), POST (cria)
    classDetail: URLS.BIT_CLASS.DETAIL,                    // GET, PUT, DELETE
    classMetrics: URLS.BIT_CLASS.METRICS,

    // School actions
    school: URLS.SCHOOL,

    // Membros
    classMembers: URLS.BIT_CLASS.MEMBERS,                  // GET, POST
    classMemberDetail: URLS.BIT_CLASS.MEMBER_DETAIL,       // GET, PUT, DELETE
    classMemberMetrics: URLS.BIT_CLASS.MEMBER_METRICS,     // GET

    // Adicionar aluno
    addStudent: URLS.BIT_CLASS.ADD_STUDENT,                // POST

    // Atividades
    classActivities: URLS.BIT_CLASS.ACTIVITIES,            // GET, POST
    classActivityDetail: URLS.BIT_CLASS.ACTIVITY_DETAIL,   // GET, PUT, DELETE
    classActivityGrade: URLS.BIT_CLASS.ACTIVITY_GRADE,     // POST

    // Submissão de Atividade
    activitySubmissions: URLS.BIT_CLASS.SUBMISSIONS,       // GET, POST
    activitySubmissionDetail: URLS.BIT_CLASS.SUBMISSION_DETAIL, // GET, PUT, DELETE

    // Frequência
    attendance: URLS.BIT_CLASS.ATTENDANCE,                 // GET, POST
    attendanceBulk: URLS.BIT_CLASS.ATTENDANCE_BULK,        // POST
    attendanceReport: URLS.BIT_CLASS.ATTENDANCE_REPORT,    // GET
    attendanceDetail: URLS.BIT_CLASS.ATTENDANCE_DETAIL,    // GET, PUT, DELETE
  }

  constructor() {
  }
}
