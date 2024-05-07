import { Routes } from '@angular/router';

import LoginComponent from './components/login/login.component';
import HomeComponent from './components/home/home.component';
import ErrorComponent from './components/error/error.component';
import QuienSoyComponent from './components/quien-soy/quien-soy.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'quienSoy',
        component: QuienSoyComponent,
    },
    {
        path: '**',
        component : ErrorComponent,
    }
];