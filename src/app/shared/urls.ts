const API_BASE_URL = 'http://127.0.0.1:8000/core';
const API_BASE_DEAFAULT_URL = 'http://127.0.0.1:8000';

export const URLS = {
  BASE: API_BASE_URL, // Pode ser alterado para a URL de produção quando necessário
  AUTH: {
    LOGIN: `${API_BASE_URL}/login/`,
    SIGNUP: `${API_BASE_URL}/signup/`,
    REFRESH: `${API_BASE_URL}token/refresh/`,
  },
  USER: `${API_BASE_URL}/auser/`, // CRUD para usuários
  CLASS: `${API_BASE_DEAFAULT_URL}/class/`, // CRUD para turmas
  SCHOOL: `${API_BASE_DEAFAULT_URL}/school/`, // CRUD para escolas
};
