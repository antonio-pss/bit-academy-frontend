const API_BASE_URL = 'http://localhost:8000/core';
const API_BASE_DEFAULT_URL = 'http://localhost:8000';

// 18.117.154.106

export const URLS = {
  BASE: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/login/`,
    SIGNUP: `${API_BASE_URL}/signup/`,
    REFRESH: `${API_BASE_URL}token/refresh/`,
  },
  USER: `${API_BASE_URL}/user/`,
  CLASS: `${API_BASE_DEFAULT_URL}/class/`,
  SCHOOL: `${API_BASE_DEFAULT_URL}/school/`,

  BIT_CLASS: {
    // CRUD Turma
    NEW: `${API_BASE_DEFAULT_URL}/class/new/`,                        // GET(list) | POST(create)
    DETAIL: (id: number) => `${API_BASE_DEFAULT_URL}/class/${id}/`,   // GET | PUT | DELETE
    METRICS: (id: number) => `${API_BASE_DEFAULT_URL}/class/${id}/metrics/`, // GET

    // Membros (Alunos)
    MEMBERS: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/members/`,  // GET | POST
    MEMBER_DETAIL: (classId: number, memberId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/members/${memberId}/`, // GET | PUT | DELETE
    MEMBER_METRICS: (classId: number, memberId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/members/${memberId}/metrics/`, // GET

    // Adicionar Aluno
    ADD_STUDENT: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/add-student/`, // POST

    // Atividades
    ACTIVITIES: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/activities/`, // GET | POST
    ACTIVITY_DETAIL: (classId: number, activityId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/activities/${activityId}/`, // GET | PUT | DELETE
    ACTIVITY_GRADE: (classId: number, activityId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/activities/${activityId}/grade/`, // POST

    // Submissões de Atividade
    SUBMISSIONS: (classId: number, activityId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/activities/${activityId}/submissions/`, // GET | POST
    SUBMISSION_DETAIL: (classId: number, activityId: number, submissionId: number) =>
      `${API_BASE_DEFAULT_URL}/class/${classId}/activities/${activityId}/submissions/${submissionId}/`, // GET | PUT | DELETE

    // Frequência (Attendance)
    ATTENDANCE: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/attendance/`, // GET | POST
    ATTENDANCE_BULK: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/attendance/bulk/`, // POST
    ATTENDANCE_REPORT: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/attendance/report/`, // GET
    ATTENDANCE_DETAIL: (classId: number, attendanceId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/attendance/${attendanceId}/`, // GET | PUT | DELETE
    CLASS_ATTENDANCE: (classId: number) => `${API_BASE_DEFAULT_URL}/class/${classId}/attendance/`,
  }
};
