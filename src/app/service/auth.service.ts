import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7114/api/Auth'; // Ajusta según tu configuración

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials);
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
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
