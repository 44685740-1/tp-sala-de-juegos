import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
