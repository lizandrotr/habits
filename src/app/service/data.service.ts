import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private hoursArraySubject = new BehaviorSubject<any[]>([]);
  private fechasArraySubject = new BehaviorSubject<any[]>([]);

  hoursArray$ = this.hoursArraySubject.asObservable();
  fechasArray$ = this.fechasArraySubject.asObservable();

  updateHoursArray(data: any[]) {
    this.hoursArraySubject.next(data);
  }

  updateFechasArray(data: any[]) {
    this.fechasArraySubject.next(data);
  }
}
