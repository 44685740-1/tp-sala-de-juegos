import { Injectable } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection,getDoc, getDocs, updateDoc, doc} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, user} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authF : Auth,private firestore: Firestore) {}
  public estaLogueado? : boolean = false;

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.authF, email, password);
      console.log('Registration successful:', userCredential.user);
      const creationTime = userCredential.user.metadata.creationTime;
      const formattedDate = creationTime ? new Date(creationTime).toLocaleDateString('es-AR') : '';
      const col = collection(this.firestore,'/usuarios');
      addDoc(col,{mail: email, password: password, fechaAlta: formattedDate});
      this.estaLogueado = true;
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.authF, email, password);
      console.log('Login successful:', userCredential.user);
      this.estaLogueado = true;
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.authF);
      console.log('Logout successful');
      this.estaLogueado = false
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}
