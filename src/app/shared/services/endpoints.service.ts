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
    userById:  URLS.USER + ':id/',

    // Class actions
    class:  URLS.CLASS + 'new/',
    classById:  URLS.CLASS + ':id/',

    // School actions
    school:  URLS.SCHOOL,
    schoolById:  URLS.SCHOOL + ':id/',


  }

  constructor() {
  }
}
