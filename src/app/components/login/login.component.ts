import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  constructor(private authService : AuthService) {}

  //public passwordTypeActivado : boolean = true;

  async register(email: string, password: string) {
    try {
      await this.authService.register(email, password);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

}
