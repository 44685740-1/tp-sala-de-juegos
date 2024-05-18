import { Injectable } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection,getDoc, getDocs, updateDoc, doc} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user, User} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authF : Auth, private firestore: Firestore, private router : Router) {}

  isLoggedIn(): Observable<boolean> {
    return authState(this.authF).pipe(
      map(user => !!user)
    );
  }


  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.authF, email, password);
      console.log('Registration successful:', userCredential.user);
      const creationTime = userCredential.user.metadata.creationTime;
      const formattedDate = creationTime ? new Date(creationTime).toLocaleDateString('es-AR') : '';
      const col = collection(this.firestore,'/usuarios');
      addDoc(col,{mail: email, password: password, fechaAlta: formattedDate});
      this.router.navigate(["/home"]);
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio Un Error intentando Registrar',
      });
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.authF, email, password);
      console.log('Login successful:', userCredential.user);
      this.router.navigate(["/home"]);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio Un Error intentando Loguearse',
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.authF);
      console.log('Logout successful');
      this.router.navigate(["/home"]);
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio Un Error intentando Cerrar la Sesion',
      });
      throw error;
    }
  }

  getCurrentUserEmail(): Observable<string | null> {
    return authState(this.authF).pipe(
      map(user => user ? user.email : null)
    );
  }
  
}
