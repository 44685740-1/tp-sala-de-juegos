import { Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  @ViewChild('emailLogin',{static:false}) emailLoginInput!: ElementRef;
  @ViewChild('passwordLogin',{static:false}) passwordLoginInput!: ElementRef;

  loginForm: FormGroup;
  
  constructor(private authService : AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', Validators.required],
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', Validators.required]
    });
  }

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

  autocompletarCampos() {
    this.emailLoginInput.nativeElement.value = "ahuitzcaracciolo@gmail.com";
    this.passwordLoginInput.nativeElement.value = "elgaturro";
  }
}
