import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service'; 
import { Router , NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { SurveyModalComponent } from './survey-modal/survey-modal.component';  // Asegúrate de tener la ruta correcta
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'habits';
  dates: string[] = ['2023-10-01', '2023-10-02', '2023-10-03'];
  hours: number[] = [2, 1.5, 1.8];
  isLoginRoute: boolean = true;

  constructor(public authService: AuthService, private router: Router, public dialog: MatDialog) {
    console.log("AppComponent");
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
        case 'loginComponent':
              this.router.navigate(['/loginComponent']); 
              break;  
        case 'register':
                this.router.navigate(['/register']); 
                break;         
        default:
            console.error('Unknown component: ' + componentName);
    }
  }

  onLogout() {
    console.log("onLogout1111");  
    const dialogRef = this.dialog.open(SurveyModalComponent, {
      width: '300px',  
      data: { }
    });
    console.log("onLogout22222");  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
      this.authService.logout();  
      this.router.navigate(['/']); 
    });


  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const navigationEndEvent = event as NavigationEnd;
      this.isLoginRoute = navigationEndEvent.urlAfterRedirects === '/login' || navigationEndEvent.urlAfterRedirects === '/';
    });
    
  }
}
