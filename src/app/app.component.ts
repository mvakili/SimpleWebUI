import { Component, OnInit } from '@angular/core';
import { UserService, ChatService } from './services';
import { Observable } from 'rxjs/Rx';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  public isLoggedIn: boolean;
  public messages: Array<any>;
  
  user : User = {
    FirstName: '',
    LastName: '',
    Username: ''
  }

  loginInput = {
    username: null,
    password: null
  }

  constructor(private userService: UserService, private chatService: ChatService) {

  }
  ngOnInit(): void {

    this.userService.isLoggedIn().subscribe((res) => {
      this.isLoggedIn = res;
      if(this.isLoggedIn) {
        this.chatService.startConnection();
        this.chatService.addChatMessages();
        this.messages = this.chatService.getMessages();
        this.userService.getProfile().then(u => {
          this.user = u;
        })
      } else {
        this.chatService.stopConnection();
      }
    })

  }
  logout() {
    this.userService.logout();
  }

  login() {
    this.userService.login(this.loginInput.username, this.loginInput.password).then(() => {
      console.log('logged in successfully');
    })
  }

  register(formData) {
    this.userService.register(formData.username, formData.password, formData.firstName, formData.lastName).then(() => {
      this.loginInput.username = formData.username;
      this.loginInput.password = formData.password;
      this.login();
    })
  }

  sendMessage(formData) {
    this.chatService.sendMessage(formData.username, formData.text);
  }
  
  
}
