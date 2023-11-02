import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projects } from '../models/projects.model';

@Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    //private apiUrl = 'http://localhost:8082/api/Project';
    private apiUrl = 'https://localhost:7114/api/Project';

    constructor(private http: HttpClient) { }

    getProject(): Observable<any> {
      const formQuery = {
        
      };
      const url = `${this.apiUrl}`;
      //return this.http.get(url,formQuery);
      
      return this.http.get<Projects>(url, formQuery);
    }

    filterProjects(project: Projects): Observable<Projects> {
      const url = `${this.apiUrl}/filter`;
      return this.http.post<Projects>(url, project);
    }

    updateProject(project: Projects): Observable<Projects> {
      
      const url = `${this.apiUrl}/register_update_project`;
      const projects = this.http.post<Projects>(url, project);
      console.log("project+++::", project);
      console.log("projects::", projects);
      return this.http.post<Projects>(url, project);
    }

    deleteProject(project: Projects): Observable<Projects> {
      const url = `${this.apiUrl}/eliminar`;

      return this.http.post<Projects>(url, project);
    }
  }
