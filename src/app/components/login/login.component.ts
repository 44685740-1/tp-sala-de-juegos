import { Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  @ViewChild('emailLogin',{static:false}) emailLoginInput!: ElementRef;
  @ViewChild('passwordLogin',{static:false}) passwordLoginInput!: ElementRef;

  public registraitionSuccesflag : boolean = true;
  public loginSuccesflag : boolean = true;

  constructor(private authService : AuthService) {}

  async register(email: string, password: string) {
    try {
      await this.authService.register(email, password);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      this.registraitionSuccesflag = false;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.authService.login(email, password);
      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      this.loginSuccesflag = false;
    }
  }

  autocompletarCampos() {
    this.emailLoginInput.nativeElement.value = "ahuitzcaracciolo@gmail.com";
    this.passwordLoginInput.nativeElement.value = "elgaturro";
  }
}
