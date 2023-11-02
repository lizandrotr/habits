import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('userToken');
    //console.log("-------token intercetor", token);
    if (token) {
      // Clonar y modificar la solicitud para agregar el encabezado de autorización
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      // Pasar la solicitud clonada en lugar de la solicitud original al siguiente manipulador
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
