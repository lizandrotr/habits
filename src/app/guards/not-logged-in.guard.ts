import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si el usuario está autenticado, redirigir a moduleprojectComponent
      this.router.navigate(['/moduleprojectComponent']);
      return false;
    }
    // Si el usuario no está autenticado, permitir el acceso
    return true;
  }
}
