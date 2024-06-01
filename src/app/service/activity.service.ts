import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activities.model';
import { ConfigService } from './config.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ActivityService {
    //private apiUrl = 'https://localhost:7114/api/Activity';
    private apiUrl: string | undefined;
    //private apiUrl = 'http://localhost:8082/api/Activity';
    
    constructor(private http: HttpClient, private configService: ConfigService) { 
      this.configService.config$.subscribe(config => {
        this.apiUrl = config.apiUrl + 'Activity';
      });
    }

    getActivity(projectId : number ,startDate : string, date_end : string, stateFilter: string): Observable<any> {
      
      return this.configService.config$.pipe(
        switchMap(config => {
          const formQuery = {
            projectId: projectId,
            startDate: startDate,
            endDate: date_end,
            state: stateFilter
          };
          
          const url = `${this.apiUrl}/getActivity`;
          return this.http.post(url, formQuery);
        })
      );


    }

    getSumHoursActivity(projectId : number ,startDate : string, date_end : string, stateFilter: string): Observable<any> {
      
      return this.configService.config$.pipe(
        switchMap(config => {
            const formQuery = {
              projectId: projectId,
              startDate: startDate,
              endDate: date_end,
              state: stateFilter
            };
            const url = `${this.apiUrl}/getSumHoursActivity`;
            return this.http.post(url, formQuery);
        })
      );

    }

    getActivityById(id: number): Observable<Activity> {

      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/getById/${id}`;
          return this.http.get<Activity>(url);
        })
      );
    }

    updateActivity(activity: Activity): Observable<Activity> {
      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/updateActivity`;
          return this.http.post<Activity>(url, activity);
        })
      );
    }

    deleteActivity(activity: Activity): Observable<Activity> {
      
      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/eliminar`;
          return this.http.post<Activity>(url, activity);
        })
      );

    }
    
    filterActivity(activity: Activity): Observable<Activity> {

      return this.configService.config$.pipe(
        switchMap(config => {
          const url = `${this.apiUrl}/filter`;
          return this.http.post<Activity>(url, activity);
        })
      );

    }

    createHabits(): Observable<Activity> {

      return this.configService.config$.pipe(
        switchMap(config => {
          const formQuery = {};
          const url = `${this.apiUrl}/createDailyHabits`;
          return this.http.post<Activity>(url, formQuery);
        })
      );

    }
  }
