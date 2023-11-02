import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficoLineasComponent } from './grafico-lineas/grafico-lineas.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ActivityComponent } from './activity/activity.component';
import { ProjectsComponent } from './activity/projects/projects.component';
import { DatePipe } from '@angular/common';
import { ModuleprojectComponent } from './moduleproject/moduleproject.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('userToken'); 
}

@NgModule({
  declarations: [
    AppComponent,
    GraficoLineasComponent,
    LineChartComponent,
    ActivityComponent,
    ProjectsComponent,
    ModuleprojectComponent,
    MenuSidebarComponent,
    CircleProgressComponent,
    StatisticsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
	  HttpClientModule,
    FormsModule,  
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    DatePipe, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
