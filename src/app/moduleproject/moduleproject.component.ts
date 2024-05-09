import { Component, OnInit, ChangeDetectorRef,  Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { Projects } from '../models/projects.model';
import { ActivityCronometro } from '../models/activityCronometro.model';
import { ActivityService } from '../service/activity.service';
import { DatePipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from '../service/config.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-moduleproject',
  templateUrl: './moduleproject.component.html',
  styleUrls: ['./moduleproject.component.scss']
})
export class ModuleprojectComponent implements OnInit{
  
  constructor( private http: HttpClient,
    private projectsService: ProjectService, private activityService: ActivityService, private changeDetectorRef: ChangeDetectorRef, 
    private datePipe: DatePipe,private jwtHelper: JwtHelperService, private configService: ConfigService) { 
      
      this.apiURL = this.configService.getConfig('apiUrl');

      const token = localStorage.getItem('userToken');
      //console.log("tokeeeen:",token);
      let decodedToken: any = null; 
      
      if (token) {   
          decodedToken = this.jwtHelper.decodeToken(token);
          //console.log("decode token:",decodedToken);
      }
      
      const userId = decodedToken?.nameid; // usa la clave que corresponda a tu payload
      this.userId = userId;
      console.log("token userID:",userId);
    }

  private apiURL = '';  
  //private apiURL = 'http://localhost:8082/api/Project/register_update_project';

  id: number =0;
  userId: number =0;
  showPopup = false;
  popupEdit: boolean = false;  
  description: string = ''; 
  date_start: string = ''; 
  date_end : string = '';
  comment: string = '';
  orden : number = 0;
  hours_day : number = 0;
  state : boolean = true;
  done : boolean = false;
  listProjects: any[] = [];

  project: Projects = new Projects();
  
  projectForm = new FormGroup({
    description: new FormControl('', Validators.required),
    hours_day: new FormControl('', [Validators.required, Validators.min(1)]),
    date_start: new FormControl('', Validators.required),
    date_end: new FormControl('', Validators.required),
    orden: new FormControl('', [Validators.required, Validators.min(1)]),
    done: new FormControl(false),
    comment: new FormControl('', Validators.maxLength(500))
  });

  ngOnInit(): void {
    this.listaProjects();

  }

  togglePopup() {
    this.showPopup = false;
    //this.popupEdit = false;
  }

  agregarProyecto(){
    this.showPopup = true;
  }
  
  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Los datos se han guardado correctamente****', this.apiURL);
      
      const url = `${this.apiURL}Project/register_update_project`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        })
      };
  
      // Obtener los valores desde el FormGroup
      const formData = this.projectForm.value;
  
      const data = {
        //id: this.id.toString(),
        id: this.id,
        description: formData.description,
        date_start: formData.date_start,
        date_finish: formData.date_end,
        state: true,
        done: formData.done,
        comment: formData.comment,
        goalsId : 0,
        orden: formData.orden,
        hours_day: formData.hours_day,
        userId : this.userId
      };
  
      console.log(data);
      this.http.post<any>(url, data, httpOptions).subscribe(
        (response) => {
          console.log("llamar al listado de actividades");
          this.listaProjects();
        },
        (error) => {
          console.log(error);
        }
      );
        
      this.togglePopup();
    }  
  }
  

  listaProjects(){
    this.projectsService.getProject().subscribe(projects => {
      this.listProjects = projects; 
      console.log(this.listProjects);
    });

  }

  getProjectById(project: Projects){
    this.popupEdit = true;
    const formattedDateStart = this.datePipe.transform(project.date_start, 'yyyy-MM-dd');
    const formattedDateEnd = this.datePipe.transform(project.date_finish, 'yyyy-MM-dd');
    this.id = project.id;
    console.log("***2:");
    //this.enviarProjectId();
    console.log(project);
    this.description = project.description;  
    this.date_start = formattedDateStart ?? '';  
    this.date_end = formattedDateEnd ?? '';
    this.state = project.state; 
    this.done = project.done;
    this.comment = project.comment;
    this.orden = project.orden;
    this.hours_day = project.hours_day;
    this.userId = project.userId;
    this.openPopup();
  }  

  onSubmitUpdate(){
    
    this.project.id = this.id; 
    this.project.description = this.description;
    this.project.date_start = this.date_start;
    this.project.date_finish = this.date_end;
    this.project.state = true;
    this.project.done = this.done;
    this.project.comment = this.comment;
    this.project.orden = this.orden;
    this.project.userId = this.userId;
   //console.log("onSubmitUpdate");
    console.log(this.project);

    //this.updateProject(this.project);
  } 

 /* updateProject(project: Projects) {
    this.projectService.updateProject(project).subscribe(project => {
      this.listaProjects();  
      this.togglePopup();  
  });  */

  openPopup() {
    this.showPopup = true;
  }
  
  eliminarProject(project: Projects) {
    if (window.confirm('¿Estás seguro de que desea eliminar el registro?')) {
      this.projectsService.deleteProject(project).subscribe(projects => {
        this.listaProjects();     
      });  
    }else{
      console.log('Eliminación cancelada');
    }
  }

}
  

