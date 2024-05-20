import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp-sala-de-juegos-ahuitz","appId":"1:535747250954:web:47a7ea1312f202abd8c8f3","storageBucket":"tp-sala-de-juegos-ahuitz.appspot.com","apiKey":"AIzaSyAfdL5A-mFvinAxTHK11slU59cspN6yND8","authDomain":"tp-sala-de-juegos-ahuitz.firebaseapp.com","messagingSenderId":"535747250954"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage())),  provideHttpClient()]
};
