import {inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

export const canActivateAdmin = () => {
  const isAdmin = inject(AuthService).role === "ADMIN"
  return isAdmin ? true : inject(Router).createUrlTree(['/']);
}
