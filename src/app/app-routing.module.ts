import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { ModuleprojectComponent } from './moduleproject/moduleproject.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  { path: 'activityComponent', component: ActivityComponent, canActivate: [LoggedInGuard] },
  { path: 'moduleprojectComponent', component: ModuleprojectComponent, canActivate: [LoggedInGuard] },
  { path: 'statisticsComponent', component: StatisticsComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
