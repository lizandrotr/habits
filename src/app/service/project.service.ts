import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, from, throwError  } from 'rxjs';
import { Projects } from '../models/projects.model';
import { ConfigService } from './config.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    //private apiUrl = 'http://localhost:8082/api/Project';
    //private apiUrl = 'https://localhost:7114/api/Project';
    private apiUrl: string | undefined;
    //private configLoaded: Promise<void>;
    
    constructor(private http: HttpClient, private configService: ConfigService) { 
      this.configService.config$.subscribe(config => {
        this.apiUrl = config.apiUrl + 'Project';
      });
    }

    /*getProject(): Observable<any> {

      
      console.log("****getProject*****",this.apiUrl);
      
      const formQuery = {};
      const url = `${this.apiUrl}`;
      return this.http.get<Projects>(url, formQuery);
    }*/

    getProject(): Observable<any> {
      return this.configService.config$.pipe(
        switchMap(config => {
          const formQuery = {};
          const url = `${this.apiUrl}`;
          return this.http.get<Projects>(url, formQuery);
        })
      );
    }

    filterProjects(project: Projects): Observable<Projects> {
      
      const url = `${this.apiUrl}/filter`;
      return this.http.post<Projects>(url, project);
    }

    updateProject(project: Projects): Observable<Projects> {
      
      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/register_update_project`;
          const projects = this.http.post<Projects>(url, project);
          return this.http.post<Projects>(url, project);
        })
      );
    }

    deleteProject(project: Projects): Observable<Projects> {
      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/eliminar`;
          return this.http.post<Projects>(url, project);
        })
      );

    }
  }
