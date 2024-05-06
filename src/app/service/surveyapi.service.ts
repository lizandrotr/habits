import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyapiService {

  private apiUrl = 'https://localhost:7114/api/CSATResponses/register';  // Cambia esto por tu URL real

  constructor(private http: HttpClient) { }

  sendSurveyResponse(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
