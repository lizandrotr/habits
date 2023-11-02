import { Component, Input, Output, EventEmitter  } from '@angular/core';
//import { SisProdApiService } from '../../sis-prod-api.service';
import { ProjectService } from '../../service/project.service';

import { ProjectsService } from './projects.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: any[] = [];
  @Input() idProjectRecibido: number = 0;
  @Output() projectSelected = new EventEmitter<number>();

  //projects: any;

  constructor(private dataService: ProjectService, private projectsService: ProjectsService) {
    this.dataService.getProject().subscribe(projects => {
      this.projects = projects; 
      console.log(".......",this.projects);
    });
    
    /*this.dataService.obtenerProjects().subscribe((data: any) => {
      this.projects = data;
      console.log(this.projects);
    });*/

  }

  onSelect(event: any) {
    //console.log("++onSelect"+ event.target.value);
    //console.log(event.target.value);
    this.projectSelected.emit(event.target.value);
    this.projectsService.selectProject(event.target.value);
  }

}
