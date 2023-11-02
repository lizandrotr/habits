import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projectSelected = new EventEmitter<number>();
  filterProjectSelected = new EventEmitter<number>();

  constructor() { }

  selectProject(id: number) {
    console.log("****selectProject");
    this.projectSelected.emit(id);
  }

}