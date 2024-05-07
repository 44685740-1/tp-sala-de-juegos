import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sala-de-juegos-fire';
  constructor(private authService : AuthService) {}

  getEstaLogueado(){
    return this.authService.estaLogueado;
  }

  async logOut() {
    try {
      await this.authService.logout();
      console.log('Log Out successful');
    } catch (error) {
      console.error('Log Out error:', error);
    }
  }
}
