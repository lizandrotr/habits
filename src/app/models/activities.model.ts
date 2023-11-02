import { Projects } from './projects.model';

export class Activity {
    id: number = 0;
    description: string = ''; 
    hours: number = 0; 
    date_start: string = ''; 
    state: boolean = false; 
    done: boolean = false;
    project: Projects | null = null;
    projectId: number = 0;
    descriptionProject: string = '';
    timeElapsed: number= 0; // Tiempo transcurrido en milisegundos
    startTime: number= 0; // Marca de tiempo cuando se inició el cronómetro
    timer: any; // ID del temporizador
    stopTime: number= 0;
    isRunningWatch: boolean = false;
    hours_day: number= 0; 
  }
