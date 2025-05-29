import {Injectable} from '@angular/core';
import {URLS} from '../urls';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  public readonly path = {
    // Authentication
    loginUser:  URLS.AUTH.LOGIN,
    signUpUser:  URLS.AUTH.SIGNUP,
    refreshToken: URLS.AUTH.REFRESH, // Adicione esta linha


    // User Actions
    user:  URLS.USER,


    // Class actions
    class:  URLS.CLASS + 'new/',
    classById:  URLS.CLASS,

    // School actions
    school:  URLS.SCHOOL,

  }

  constructor() {
  }
}
