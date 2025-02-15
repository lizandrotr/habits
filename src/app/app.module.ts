import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ConfigService } from './service/config.service';
import { SurveyModalComponent } from './survey-modal/survey-modal.component';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { IndexComponent } from './index/index.component';

export function tokenGetter() {
  return localStorage.getItem('userToken'); 
}

export function initializeApp(configService: ConfigService) {
  return (): Promise<any> => {
    return configService.loadConfigToService();
  };
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
    TestComponent,
    SurveyModalComponent,
    ImageCarouselComponent,
    IndexComponent
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
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    DatePipe, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ,ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
