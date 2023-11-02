import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent {

  constructor(private router: Router) { }

  activeMenuItem: string = 'activityComponent';

  
  navigateToComponent(componentName: string) {
    this.activeMenuItem = componentName;
    this.router.navigate([componentName]);
  }
}
