import { Routes } from '@angular/router';

import LoginComponent from './components/login/login.component';
import HomeComponent from './components/home/home.component';
import ErrorComponent from './components/error/error.component';
import QuienSoyComponent from './components/quien-soy/quien-soy.component';
import ChatComponent  from './components/chat/chat.component';
import AhorcadoComponent from './components/ahorcado/ahorcado.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component'),
    },
    {
        path: 'home/chat',
        loadComponent: () => import('./components/chat/chat.component'),
        canActivate:[authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component'),
    },
    {
        path: 'quienSoy',
        loadComponent: () => import('./components/quien-soy/quien-soy.component'),
    },
    {
        path: '',
        redirectTo: 'home', pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () => import('./components/error/error.component')
    }
];