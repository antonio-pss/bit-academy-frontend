const localhost = 'http://127.0.0.1:8000/api';

export const URLS = {
  BASE: localhost, // Mude para `production` quando necessário

  AUTH: {
    LOGIN: `${localhost}/auth/login/`,
    SIGNUP: `${localhost}/auth/signup/`,
  },
  USER: `${localhost}/user/`, //URL para os métodos GET, POST, PUT e DELETE
};
