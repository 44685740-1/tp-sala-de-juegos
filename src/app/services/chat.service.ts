import { Injectable } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection,getDoc, getDocs, updateDoc, doc, orderBy, query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  async enviarMensaje(mensaje: string, correo: string) {
    try {
      const fechaActual = new Date().toISOString();
      //const fechaActual = new Date().toLocaleString('es-Ar', { timeZone: 'UTC' });
      const mensajesCollection = collection(this.firestore, 'mensajes');

      await addDoc(mensajesCollection, {
        contenido: mensaje,
        fechaEnvio: fechaActual,
        senderMail: correo
      });

      console.log('Mensaje enviado correctamente');
    } catch (error) {
      console.error('Hubo un error al enviar el mensaje', error);
      throw error;
    }
  }

  obtenerMensajes(): Observable<any[]> {
    const mensajesCollection = collection(this.firestore, 'mensajes');
    const q = query(mensajesCollection, orderBy('fechaEnvio'));
    return new Observable<any[]>(subscriber => {
      getDocs(q).then(snapshot => {
        const mensajes = snapshot.docs.map(doc => doc.data());
        subscriber.next(mensajes);
      }).catch(error => {
        subscriber.error(error);
      });
    });
  }
}
