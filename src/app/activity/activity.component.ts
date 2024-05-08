import { Component, OnInit, ChangeDetectorRef,  Output, EventEmitter  } from '@angular/core';
import { SisProdApiService } from '../sis-prod-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ProjectsService } from './projects/projects.service';
import { Activity } from '../models/activities.model';
import { ActivityCronometro } from '../models/activityCronometro.model';
import { ActivityService } from '../service/activity.service';
import { DatePipe } from '@angular/common';
import { DataService } from '../service/data.service'; // Importa tu servicio
import { ConfigService } from '../service/config.service';
import { PulseService } from '../service/pulse.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit  {
  
  constructor(private miServicio: SisProdApiService, private http: HttpClient,
     private projectsService: ProjectsService, private changeDetectorRef: ChangeDetectorRef, 
     private activityService: ActivityService, private datePipe: DatePipe, private dataService: DataService
     , private configService: ConfigService,  private pulseService: PulseService) {
      
        this.apiURL = this.configService.getConfig('apiUrl') + 'Activity?ProjectId=';
        console.log("Activity url++++ :::" + this.apiURL);
     }
  
  

  activity: Activity = new Activity();
  activitiesCronometro: ActivityCronometro = new ActivityCronometro();  
  
  //activitiesCronometro:  ActivityCronometro[] = [];
  activities: Activity[] = [];
  
  fechasArray: string[] = ['2023-10-12'];  
  hoursArray: number[] = [8];
  
  startDate: string = ''; 
  stateFilter: string = ""; 

  //private apiURL = 'https://localhost:7114/api/Activity?ProjectId=';
  private apiURL = '';
  projects: any;
  id: number =0;
  ProjectId: number = 0;
  filterProjectId: number = 0;
  description: string = ''; 
  hours: number = 0; 
  hours_day: number = 0;
  date_start: string = ''; 
  date_end : string = '';
  state: boolean = false; 
  done: boolean = false;
    
  listActivities: any[] = [];

  showPopup = false;
  
  CronometroactividadId: number = 0; 
  CronometroactividadDescripcion: string = '';
  //@Output() projectIdEnviarSelect = new EventEmitter<number>();
  idProjectRecibido : number = 0;
  isRunningWatch: boolean = false;
  resultSumActivities: number = 0;
  popupEdit: boolean = false;
  showGraphic: boolean = false;
  active_pulse: boolean = false;

  onProjectfilter(id: number){
    this.filterProjectId = id;
    console.log("---------onProjectfilter" + id);
  }

  enviarProjectId() {
    console.log("enviarProjectId");
    console.log(this.ProjectId);
    this.idProjectRecibido = this.ProjectId;
    //this.projectIdEnviarSelect.emit(this.ProjectId);
  }

  togglePopup() {
    
    this.showPopup = false;
    this.popupEdit = false;
  }

  clearData(){ 
    this.description = '';
    this.hours = 0;
    this.date_start = this.date_start;
    this.state = false;
    this.done = false;
    this.ProjectId = 0;
  }

  openPopup() {
    this.showPopup = true;
  }

  openPopupAgregar(){
    this.clearData();
    this.showPopup = true;
  }

  updateActivity(activity: Activity) {
    this.activityService.updateActivity(activity).subscribe(activities => {
    this.listACtivities();  
    this.togglePopup();  
  });  
}

  eliminarActivity(activity: Activity) {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.activityService.deleteActivity(activity).subscribe(activities => {
        this.listACtivities();    
        //this.listActivities = activities;
      });
    }else{
      console.log('Eliminación cancelada');
    }
    
      
  }

  filterActivity(){
    this.listACtivities()
  }

  onSubmit() {
    console.log('Los datos se han guardado correctamente****');
    if(this.popupEdit == false ){  
    
    const url = `${this.apiURL}${this.ProjectId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      })
    };

    const data = {
      description: this.description,
      hours: this.hours,
      date_start: this.date_start,
      state: true,
      done: false
    };
    console.log("***11111111****");
    console.log(data);
    this.http.post<any>(url, data, httpOptions).subscribe(
      (response) => {
        console.log("llamar al listado de actividades");

        this.listACtivities();
      },
      (error) => {
        console.log(error);
      }
    );
      
    this.togglePopup();

    }else{
      console.log("if onSubmitUpdate");
      this.onSubmitUpdate();    
    }
  }

  onSubmitUpdate(){
    
    this.activity.id = this.id; 
    this.activity.description = this.description;
    this.activity.hours = this.hours;
    //this.activity.hours_day = this.hours_day;
    this.activity.date_start = this.date_start;
    this.activity.state = true;
    
    console.log("this.hours"+this.hours);
    console.log("this.hours"+this.hours_day);
    if(this.hours >= this.hours_day ){
      this.activity.done = true; 
    }else{
      this.activity.done = false;
    }
    
    this.activity.projectId = this.ProjectId;
   //console.log("onSubmitUpdate");
    console.log(this.activity);

    this.updateActivity(this.activity);
  }  

  ngOnInit(): void {

    this.changeDetectorRef.detectChanges();
    
    const now = new Date(); 
    

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    this.date_start = `${year}-${month}-${day}`;
    this.startDate = `${year}-${month}-${day}`;
    this.date_end = `${year}-${month}-${day}`;
    
    this.miServicio.obtenerProjects().subscribe((data) => {
      this.projects = data;
      console.log(this.projects);
    });

    this.projectsService.projectSelected.subscribe((id: number) => {
      //this.filterProjectId = id;
      this.ProjectId =  id;
      console.log('Selected project ID:', this.ProjectId);
    });

    this.listACtivities();
  }



  iniciarActividad(activity: Activity){
    this.CronometroactividadId = activity.id;
    this.CronometroactividadDescripcion = activity.description;

    console.log("Actividad id" + activity.id);
    console.log("Actividad descripcion" + activity.description);
    //this.startTimer(this.activitiesCronometro);
  }

  getActivityById(activity: Activity){
    this.popupEdit = true;
    const formattedDate = this.datePipe.transform(activity.date_start, 'yyyy-MM-dd');
    this.id = activity.id;
    this.ProjectId  = activity.projectId;
    console.log("***2:");
    this.enviarProjectId();
    console.log(this.id);
    this.description = activity.description; 
    this.hours = activity.hours; 
    this.date_start = formattedDate ?? '';  
    this.state = activity.state; 
    this.done = activity.done;
    this.hours_day = activity.hours_day;
    this.openPopup();
  }  

  listACtivities(){
    console.log("this.ProjectId" + this.filterProjectId + " this.stateFilter" + this.stateFilter);
    this.activityService.getActivity(this.filterProjectId, this.startDate, this.date_end, this.stateFilter).subscribe(activities => {
      this.listActivities = activities;
      this.hoursArray = [];  
      console.log("LISTA DE ACTIVIDADES", this.listActivities);
      
      console.log('Array de horas:', this.hoursArray);
      this.getDatesInRange(this.startDate, this.date_end);
    });

    this.activityService.getSumHoursActivity(this.filterProjectId, this.startDate, this.date_end, this.stateFilter).subscribe(resultSumActivities => {
      this.resultSumActivities = resultSumActivities;
      console.log(resultSumActivities);
    });
  }

   getDatesInRange(startDateStr: string, endDateStr: string): string[] {
    this.fechasArray = [];  
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    let currentDate = new Date(startDate);
    //console.log("currentDate******",currentDate.getTime());
    while (currentDate <= endDate) {

      let elementExistsArray = false;   

      for (const item of this.listActivities) {

        const date_start_listActivity = new Date(item.date_start.split('T')[0]);

        if(currentDate.getTime() === date_start_listActivity.getTime()){
          elementExistsArray = true;
          this.hoursArray.push(item.hours);
        }
      }
      
      if(elementExistsArray == false){
        this.hoursArray.push(0);
      }

      this.fechasArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if(this.ProjectId != 0){
      this.showGraphic = true;  
    }
    

    //this.fechasArray = ['2023-10-12'];
    console.log("---fechasArray:",this.fechasArray);
    
    this.dataService.updateHoursArray(this.hoursArray);
    this.dataService.updateFechasArray(this.fechasArray);
    return this.fechasArray;
  }
  
  // Ejemplo de uso
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Agregar el siguiente código al componente TypeScript

// Inicializar el cronómetro
//startTimer(activity: ActivityCronometro, registro: Activity) {
  startTimer(activity : Activity) {
  
  this.pulseService.activatePulse(activity.id);
  
  activity.isRunningWatch = true;
  
  if (activity.stopTime) {
    activity.startTime = new Date().getTime() - (activity.stopTime - activity.startTime);
  } else {
    activity.startTime = new Date().getTime();
  }
  activity.timer = setInterval(() => {
    const now = new Date().getTime();
    activity.timeElapsed = now - activity.startTime;
  }, 1000);
}

// Detener el cronómetro
//stopTimer(activity: ActivityCronometro, registro: Activity) {
stopTimer(activity : Activity) {
  this.pulseService.deactivatePulse();

  activity.stopTime = new Date().getTime();
  clearInterval(activity.timer);
}

/*resetTimer(activity: ActivityCronometro) {
  activity.timeElapsed = 0;
  activity.startTime = null;
}*/

// Formatear el tiempo transcurrido en un objeto con las horas, minutos y segundos
//formatTime(activity: ActivityCronometro) {
  formatTime(activity: Activity) {
//const hours = Math.floor(activity.timeElapsed / 3600000);
  
  const hours =  Math.floor(activity.timeElapsed / 3600000);
    // Resto del código...
  
  const minutes = Math.floor((activity.timeElapsed % 3600000) / 60000);
  const seconds = Math.floor((activity.timeElapsed % 60000) / 1000);
  return { hours: hours.toString().padStart(2, '0'), minutes: minutes.toString().padStart(2, '0'), seconds: seconds.toString().padStart(2, '0') };
}

// Guardar el tiempo transcurrido en la base de datos
//saveTime(activity: ActivityCronometro, registro : Activity) {
  saveTime(activity: Activity) {   
    this.pulseService.deactivatePulse(); 
    activity.isRunningWatch = false;
    const activityHora = new Activity();
    const hours = activity.hours + activity.timeElapsed / 3600000;
    
    //const hours = activity.hours +  0.5;
    
    activityHora.id = activity.id; 
    activityHora.description = activity.description;
    activityHora.hours = hours;
    activityHora.date_start = activity.date_start;
    activityHora.state = activity.state;
    activityHora.done = activity.done;
    activityHora.projectId = activity.projectId;
    
    console.log(activityHora);
    // Resto del código...
    this.updateActivity(activityHora);
}

}
