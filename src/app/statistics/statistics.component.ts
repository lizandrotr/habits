import { Component, OnInit, ChangeDetectorRef,  Output, EventEmitter  } from '@angular/core';
import { SisProdApiService } from '../sis-prod-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ProjectsService } from '../activity/projects/projects.service';
import { Activity } from '../models/activities.model';
import { ActivityCronometro } from '../models/activityCronometro.model';
import { ActivityService } from '../service/activity.service';
import { DatePipe } from '@angular/common';
import { DataService } from '../service/data.service'; // Importa tu servicio

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

constructor(private miServicio: SisProdApiService, private http: HttpClient,
     private projectsService: ProjectsService, private changeDetectorRef: ChangeDetectorRef, 
     private activityService: ActivityService, private datePipe: DatePipe, private dataService: DataService) { }
  
  

  activity: Activity = new Activity();
  activitiesCronometro: ActivityCronometro = new ActivityCronometro();  
  
  //activitiesCronometro:  ActivityCronometro[] = [];
  activities: Activity[] = [];
  
  fechasArray: string[] = ['2023-10-12'];  
  hoursArray: number[] = [8];
  
  startDate: string = ''; 
  stateFilter: string = ""; 

  //private apiURL = 'http://localhost:8082/api/Activity?ProjectId=';
  
  projects: any;
  id: number =0;
  ProjectId: number = 0;
  filterProjectId: number = 0;
  description: string = ''; 
  hours: number = 0; 
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

  clearData(){ 
    this.description = '';
    this.hours = 0;
    this.date_start = this.date_start;
    this.state = false;
    this.done = false;
    this.ProjectId = 0;
  }

  filterActivity(){
    this.listACtivities()
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



  listACtivities(){
    console.log("this.ProjectId" + this.filterProjectId + " this.stateFilter" + this.stateFilter);
    this.activityService.getActivity(this.filterProjectId, this.startDate, this.date_end, this.stateFilter).subscribe(activities => {
      this.listActivities = activities;
      this.hoursArray = [];  
      console.log("LISTA DE ACTIVIDADES", this.listActivities);
      
      console.log('Array de horas:', this.hoursArray);
      this.getDatesInRange(this.startDate, this.date_end);
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
  
}
