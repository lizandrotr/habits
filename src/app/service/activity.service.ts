import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activities.model';

@Injectable({
    providedIn: 'root'
  })
  export class ActivityService {
    private apiUrl = 'https://localhost:7114/api/Activity';
    //private apiUrl = 'http://localhost:8082/api/Activity';
    
    constructor(private http: HttpClient) { }

    getActivity(projectId : number ,startDate : string, date_end : string, stateFilter: string): Observable<any> {
      const formQuery = {
        projectId: projectId,
        startDate: startDate,
        endDate: date_end,
        state: stateFilter
      };

      console.log("***");
      console.log(formQuery);
      
      const url = `${this.apiUrl}/getActivity`;
      return this.http.post(url, formQuery);
    }

    getSumHoursActivity(projectId : number ,startDate : string, date_end : string, stateFilter: string): Observable<any> {
      const formQuery = {
        projectId: projectId,
        startDate: startDate,
        endDate: date_end,
        state: stateFilter
      };
      const url = `${this.apiUrl}/getSumHoursActivity`;
      return this.http.post(url, formQuery);
    }

    getActivityById(id: number): Observable<Activity> {
      const url = `${this.apiUrl}/getById/${id}`;
      return this.http.get<Activity>(url);
    }

    updateActivity(activity: Activity): Observable<Activity> {
      const url = `${this.apiUrl}/updateActivity`;

      return this.http.post<Activity>(url, activity);
    }

    deleteActivity(activity: Activity): Observable<Activity> {
      const url = `${this.apiUrl}/eliminar`;

      return this.http.post<Activity>(url, activity);
    }
    
    filterActivity(activity: Activity): Observable<Activity> {
      const url = `${this.apiUrl}/filter`;

      return this.http.post<Activity>(url, activity);
    }
  }
