const API_BASE_URL = 'http://18.117.154.106:8000';

export const URLS = {
  BASE: API_BASE_URL, // Pode ser alterado para a URL de produção quando necessário
  AUTH: {
    LOGIN: `${API_BASE_URL}/core/login/`,
    SIGNUP: `${API_BASE_URL}/core/signup/`,
    REFRESH: `${API_BASE_URL}/core/token/refresh/`,
  },
  USER: `${API_BASE_URL}/core/user/`, // CRUD para usuários
  CLASS: `${API_BASE_URL}/class/`, // CRUD para turmas
  SCHOOL: `${API_BASE_URL}/school/`, // CRUD para escolas
};
