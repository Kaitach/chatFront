import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Chat App</h1>
    <div *ngFor="let message of messages">
      <p>{{ message.sender }}: {{ message.content }}</p>
    </div>
    <form (submit)="sendMessage()">
<input type="text" [(ngModel)]="newMessage.content" name="content" placeholder="Message">

      <button type="submit">Send</button>
    </form>
  `,
})
export class AppComponent implements OnInit {
  messages: any[] = [];
  username!: string  

  newMessage = { sender: this.username || "Invitado", content: '' };

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.getUsername();
    this.loadMessages();
    this.startMessageReceiving()
  }

  loadMessages() {
    this.messageService.getAllMessages().subscribe(
      (messages: any[]) => {
        this.messages = messages;
      },
      (error) => {
        console.log('Error retrieving messages:', error);
      }
    );
  }

  sendMessage() {
    this.newMessage.sender = this.username
    this.messageService.createMessage(this.newMessage).subscribe(
      () => {
        this.newMessage.sender = '';
        this.newMessage.content = '';
        this.loadMessages(); // Actualizar los mensajes después de enviar uno nuevo
      },
      (error) => {
        console.log('Error sending message:', error);
      }
    );
  }

  startMessageReceiving() {
    interval(1000).subscribe(() => {
      this.loadMessages();
    });
  }

  getUsername() {
    this.username = prompt('Please enter your username:') as string;
  }
}
