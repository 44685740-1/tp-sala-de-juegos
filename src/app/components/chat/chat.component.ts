import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export default class ChatComponent implements OnInit {
  @ViewChild('mensaje', { static: false }) mensajeInput!: ElementRef;
  messages: any[] = [];
  userEmail: string | null = null;
  constructor(private chatService: ChatService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.obtenerMensajes();
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  enviarMensaje() {
    const mensaje = this.mensajeInput.nativeElement.value;

    if (!mensaje || mensaje.trim() === '') {
      console.log('El mensaje no puede estar vacío.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El mensaje No puede estar Vacio',
      });
      return;
    } else {
      if (this.userEmail != null) {
        this.chatService.enviarMensaje(mensaje, this.userEmail)
        .then(() => {
          this.obtenerMensajes(); // Actualizar la lista de mensajes después de enviar el mensaje
          this.mensajeInput.nativeElement.value = '';
        })
        .catch(error => console.error('Error enviando mensaje:', error));
      } else 
      {
        console.log("Necesita Loguearse para mandar mensajes");
        return
      }
    }
  }

  obtenerMensajes() {
    this.chatService.obtenerMensajes().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }
}
