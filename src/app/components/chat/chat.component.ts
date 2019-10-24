import { Component, OnInit } from '@angular/core';
import { ChatService, UserService } from 'src/app/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public isLoggedIn: boolean;
  public messages: Array<any>;

  constructor(private userService: UserService, private chatService: ChatService) { }

  ngOnInit() {
    this.userService.isLoggedIn().subscribe((res) => {
      if(res) {
        this.chatService.startConnection();
        this.chatService.addChatMessages();
        this.messages = this.chatService.getMessages();
      } else {
        this.chatService.stopConnection();
      }
    })
  }

  sendMessage(formData) {
    this.chatService.sendMessage(formData.username, formData.text);
  }
}
