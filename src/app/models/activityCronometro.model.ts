
export class ActivityCronometro {
    id: number = 0;
    descriptionProject: string = '';
    timeElapsed: number= 0; // Tiempo transcurrido en milisegundos
    startTime: number= 0; // Marca de tiempo cuando se inició el cronómetro
    timer: any; // ID del temporizador
    stopTime: number= 0;
    isRunningWatch: boolean = false;
  }
