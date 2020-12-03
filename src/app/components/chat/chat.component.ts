import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit{

  mensaje = '';
  elemento: any;

  constructor(public chatService: ChatService) {

    this.chatService.cargarMensajes().subscribe( () => {

      setTimeout( () => {

        this.elemento.scrollTop = this.elemento.scrollHeight;

      }, 20);


    });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }


  enviar_mensaje(): any {
    console.log( this.mensaje );

    if ( this.mensaje.length === 0 ) {
      return;
    }

    this.chatService.agregarMensaje( this.mensaje );

    this.mensaje = '';

  }

}
