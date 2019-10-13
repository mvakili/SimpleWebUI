import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import {BaseService} from "./base.service";

import { BehaviorSubject, Observable } from 'rxjs/Rx'; 
import { User } from '../models/user';

// Add the RxJS Observable operators we need in this app.

@Injectable()

export class UserService extends BaseService {


  // Observable navItem source
  private _authStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authStatus = this._authStatusSource.asObservable();

  constructor(private http: Http) {
    super();
    this._authStatusSource.next(!!localStorage.getItem('auth_token'));
  }

  register(username: string, password: string, firstName: string, lastName: string): Promise<void> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "/user/register", { username, password, firstName, lastName }, options)
    .map(res => {
      return;
    })
    .catch(this.handleError)
    .toPromise();
  }  

   login(username: string, password: string) : Promise<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/user/login',
      { username, password },{ headers }
      )
      .map(res => res.text())
      .map(res => {
        localStorage.setItem('auth_token', res);
        this._authStatusSource.next(true);
        return;
      })
      .catch(this.handleError)
      .toPromise();
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._authStatusSource.next(false);
  }

  isLoggedIn() : Observable<boolean> {
    return this.authStatus;
  }

  getProfile(): Promise<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let options = new RequestOptions({ headers: headers });
    return this.http.get(
      this.baseUrl + '/user/profile', options)
      .map(res => res.json() as User)
      .catch(this.handleError)
      .toPromise();

  }
}

