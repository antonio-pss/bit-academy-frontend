import {Injectable} from '@angular/core';
import {URLS} from '../urls';


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {
  public readonly endpoints = {
    // Authentication

    loginUser: URLS.BASE + URLS.ACCOUNTS.LOGIN,
    signUpUser: URLS.BASE + URLS.ACCOUNTS.SIGNUP,
    resetPassword: URLS.BASE + URLS.ACCOUNTS.RESET_PASSWORD,
    logoutUser: URLS.BASE + URLS.ACCOUNTS.LOGOUT
  }

  constructor() {
  }
}
