import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }
}
