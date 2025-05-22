const API_BASE_URL = 'http://18.117.154.106/core';

export const URLS = {
  BASE: API_BASE_URL, // Pode ser alterado para a URL de produção quando necessário
  AUTH: {
    LOGIN: `${API_BASE_URL}/login/`,
    SIGNUP: `${API_BASE_URL}/signup/`,
    REFRESH: `${API_BASE_URL}token/refresh/`,
  },
  USER: `${API_BASE_URL}/auser/`, // CRUD para usuários
  CLASS: `${API_BASE_URL}/class/`, // CRUD para turmas
  SCHOOL: `${API_BASE_URL}/school/`, // CRUD para escolas
};
