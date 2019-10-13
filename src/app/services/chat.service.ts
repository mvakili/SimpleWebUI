import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BaseService } from './base.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IHttpConnectionOptions } from '@microsoft/signalr';
 
@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
 
private hubConnection: signalR.HubConnection
 
  messages: Array<any> = [];

  constructor(private http: Http) {
    super();
  }
  public startConnection = () => {
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return localStorage.getItem('auth_token')
      }
    };
    
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:4000/chatHub', options)
                            .withAutomaticReconnect()
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(this.handleError)

  }

  public stopConnection = () => {
    if(this.hubConnection) {
      this.hubConnection.stop()
      .then(() => {
        this.messages = [];
      })
      .catch(this.handleError)
    }
  }

 
  public addChatMessages = () => {
    this.hubConnection.on('chatMessages', (data) => {
      this.messages.push(data);
    });
  }

  public sendMessage(username: string, text: string) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      this.baseUrl + '/chat', { username, text }, options)
      .catch(this.handleError)
      .toPromise();
  }

  public getMessages() : Array<any> {
    return this.messages;
  }

}