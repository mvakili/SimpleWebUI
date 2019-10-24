import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BaseService } from './base.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IHttpConnectionOptions } from '@microsoft/signalr';
 
@Injectable({
  providedIn: 'root'
})
export class MapService extends BaseService {
 
  constructor(private http: Http) {
    super();
  }

  public setLocation(x: number, y: number) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.baseUrl + '/user/location', { x, y }, options)
      .catch(this.handleError)
      .toPromise();
  }

  public getUsersAroundMe(radius: number) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let options = new RequestOptions({ headers: headers });
    return this.http.get(
      this.baseUrl + `/user/location/around/me?radius=${radius}`, options)
      .map(res => res.json())
      .catch(this.handleError)
      .toPromise();
  }

  public getUsersAround(x: number, y: number, radius: number) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let options = new RequestOptions({ headers: headers });
    return this.http.get(
      this.baseUrl + `/user/location/around?x=${x}&y=${y}&radius=${radius}`, options)
      .map(res => res.json())
      .catch(this.handleError)
      .toPromise();
  }
}