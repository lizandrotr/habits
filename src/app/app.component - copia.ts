import { Component } from '@angular/core';

import { AuthService } from './service/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'habits';
  dates: string[] = ['2023-10-01', '2023-10-02', '2023-10-03'];
  hours: number[] = [2, 1.5, 1.8];

  constructor(public authService: AuthService, private router: Router) {
    console.log("*****AppComponent*****");
    //localStorage.removeItem('userToken');
  }

  navigateToComponent(componentName: string) {
    switch(componentName) {
        case 'moduleprojectComponent':
            this.router.navigate(['/moduleprojectComponent']); 
            break;
        case 'activityComponent':
            this.router.navigate(['/activityComponent']); 
            break;
        case 'statisticsComponent':
            this.router.navigate(['/statisticsComponent']); 
            break;
        default:
            console.error('Unknown component: ' + componentName);
    }
  }

  onLogout() {
    this.authService.logout();  
    this.router.navigate(['/login']); 
  }
}
