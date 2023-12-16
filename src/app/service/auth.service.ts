import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'https://localhost:7114/api/Auth'; // Ajusta según tu configuración
  private apiUrl: string | undefined;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.config$.subscribe(config => {
      this.apiUrl = config.apiUrl + 'Auth';
    });
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.configService.config$.pipe(
      switchMap(config => {
        return this.http.post(this.apiUrl + '/login', credentials);
      })
    );
  }

  saveToken(token: string): void {
    //console.log("**saveToken**"+token);
    localStorage.setItem('userToken', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');
    //console.log("***token**"+token+"**isLoggedIn**"+!!token);
    return !!token;
  }

  logout() {
    localStorage.removeItem('userToken'); 
  }
  
  register(userData: any) {
    return this.configService.config$.pipe(
      switchMap(config => {
        return this.http.post(`${this.apiUrl}/register`, userData);
      })
    );
    
  }
}
