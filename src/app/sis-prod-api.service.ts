import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SisProdApiService {

  constructor(private http: HttpClient) { }
  obtenerProjects(): Observable<any> {
    return this.http.get('http://localhost:7114/api/Project');
  }
  obtenerActivities(): Observable<any> {
    return this.http.get('http://localhost:7114/api/Activity');
  }

}
