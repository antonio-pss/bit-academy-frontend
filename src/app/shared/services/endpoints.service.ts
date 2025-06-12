import {Injectable} from '@angular/core';
import {URLS} from '../urls';


@Injectable({
  providedIn: 'root'
})

/* Exemplo de uso
this.endpoints.path.classDetail(class_id)
this.endpoints.path.classMembers(class_member_Id)
this.endpoints.path.addStudent(class_id, user_id)

this.endpoints.path.classActivityDetail(class_id, activity_id)
this.endpoints.path.attendanceReport(class_id)
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
    bitSchoolCourses: URLS.BIT_SCHOOL.COURSES,
    bitSchoolCourseDetail: URLS.BIT_SCHOOL.COURSE_DETAIL,

    // BitSchool – Instituições
    bitSchoolInstitutions: URLS.BIT_SCHOOL.INSTITUTIONS,
    bitSchoolInstitutionDetail: URLS.BIT_SCHOOL.INSTITUTION_DETAIL,

    // BitSchool – Módulos
    bitSchoolModules: URLS.BIT_SCHOOL.MODULES,
    bitSchoolModuleDetail: URLS.BIT_SCHOOL.MODULE_DETAIL,

    // BitSchool – Disciplinas
    bitSchoolDisciplines: URLS.BIT_SCHOOL.DISCIPLINES,
    bitSchoolDisciplineDetail: URLS.BIT_SCHOOL.DISCIPLINE_DETAIL,

    // BitSchool – Relacionamento Curso-Módulo-Disciplina
    bitSchoolCMDLinks: URLS.BIT_SCHOOL.CMD_LINKS,
    bitSchoolCMDDetail: URLS.BIT_SCHOOL.CMD_DETAIL,

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

    classAttendance: URLS.BIT_CLASS.CLASS_ATTENDANCE,
  }




  constructor() {
  }
}
