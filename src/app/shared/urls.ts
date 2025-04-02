const localhost = 'http://localhost:8080';

export const URLS = {
  BASE: localhost, // Mude para `production` quando necessário

  ACCOUNTS: {
    LOGIN: `${localhost}/accounts/login`,
    SIGNUP: `${localhost}/accounts/signup`,
    RESET_PASSWORD: `${localhost}/accounts/resetpassword`,
    LOGOUT: `${localhost}/accounts/logout`,
  },
  USER:{
    // Adionar urls de perfil do usuário
  }
};
