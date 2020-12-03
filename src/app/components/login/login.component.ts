import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( public chatService: ChatService) { }

  ngOnInit(): void {
  }

  ingresar( proveedor: string ): any {

    console.log( proveedor );

    this.chatService.login( proveedor );

  }

}
