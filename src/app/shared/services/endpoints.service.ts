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
  }

  constructor() {
  }
}
