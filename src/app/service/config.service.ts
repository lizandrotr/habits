// src/app/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';
  private configSubject = new ReplaySubject<any>(1); // Emite el último valor a los nuevos suscriptores
  public config$ = this.configSubject.asObservable(); // Exponer como Observable
  private configSettings: any;

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  /*loadConfig(): Observable<any> {
    return this.http.get(this.configUrl);
  }*/

  /*loadConfigToService(): Promise<any> {
    console.log("++++loadConfigToService++++");
    
    return this.http.get('/assets/config.json').toPromise().then(config => {
      console.log("++++loadConfigToService configSettings 22222:", config);
      this.configSettings = config;
      return config;
    });
  }*/
  
  private loadConfig() {
    this.http.get(this.configUrl).subscribe(
      config => this.configSubject.next(config),
      error => this.configSubject.error(error)
    );
  }

  getConfig(key: string): any {
    let config;
    this.config$.subscribe(settings => config = settings[key]).unsubscribe();
    return config;
  }

  loadConfigToService(): Promise<any> {
    return this.http.get('/assets/config.json').toPromise().then(config => {
      this.configSettings = config;
      return config; // Asegúrate de devolver la configuración aquí.
    }).catch(error => {
      console.error('Error al cargar la configuración:', error);
    });
  }

  /*setConfig(key: string, value: any): void {
    this.configSettings[key] = value;
    // Aquí podrías también guardar los cambios en el servidor o en localStorage
  }*/
}
