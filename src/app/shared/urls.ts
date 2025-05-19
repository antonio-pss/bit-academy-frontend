const API_BASE_URL = 'http://127.0.0.1:8000/core';

export const URLS = {
  BASE: API_BASE_URL, // Pode ser alterado para a URL de produção quando necessário
  AUTH: {
    LOGIN: `${API_BASE_URL}/login/`,
    SIGNUP: `${API_BASE_URL}/signup/`,
  },
  USER: `${API_BASE_URL}/auser/`, // CRUD para usuários
  CLASS: `${API_BASE_URL}/class/`, // CRUD para turmas
  SCHOOL: `${API_BASE_URL}/school/`, // CRUD para escolas
};
