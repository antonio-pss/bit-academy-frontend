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

    // User Actions
    user:  URLS.USER,
    userById:  URLS.USER + ':id/',

    // Class actions
    class:  URLS.CLASS,
    classById:  URLS.CLASS + ':id/',

    // School actions
    school:  URLS.SCHOOL,
    schoolById:  URLS.SCHOOL + ':id/',

  }

  constructor() {
  }
}
