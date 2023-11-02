import { Component, OnInit, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';  // Importa Chart desde 'chart.js'
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service'; // Importa tu servicio

import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {

  // lineChartLabels: string[];  // Datos de fecha
 /* @Input() lineChartHours: number[];  // Datos de hora*/
 
 //@Input() arrayHours: number[] = []; 
 //@Input() arrayDate: string[] = []; 
 
 arrayHours: number[] = []; 
 arrayDate: string[] = []; 

 private hoursArraySubscription: Subscription = new Subscription(); // Inicializa la propiedad hoursArraySubscription
 private fechasArraySubscription: Subscription = new Subscription(); // Inicializa la propiedad fechasArraySubscription

 constructor(private dataService: DataService) {}

 lineChartData = [
    { 
      data: this.arrayHours,
      label: 'Horas',
    }
  ];
  
  lineChartLabels: string[] = this.arrayDate;

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Fechas',
          font: {
            size: 30
          }
        },
        ticks: {
          font: {
            size: 20
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Horas',
          font: {
            size: 30
          }
        },
        ticks: {
          font: {
            size: 20
          }
        }
      }
    },
    plugins: {
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y',
          value: 1.5,
          borderColor: 'green',
          borderWidth: 2
        }]
      },
      trendline: {
        showLine: true,
        line: {
          borderColor: 'rgba(255,0,0,0.3)',
          borderWidth: 2
        },
        tooltip: {
          enabled: true,
          format: 'HH:mm'
        }
      }
    }
  };

  public lineChartLegend = true;
  public lineChartType = 'line';


  ngOnInit() {

    this.hoursArraySubscription = this.dataService.hoursArray$.subscribe((data) => {
      this.arrayHours = data;
      console.log("arrayHours:::::", this.arrayHours);
      // Lógica para actualizar el gráfico con arrayHours

      this.lineChartData = [
        { 
          data: this.arrayHours,
          label: 'Horas',
        }
      ];
      
      
    });

    this.fechasArraySubscription = this.dataService.fechasArray$.subscribe((data) => {
      this.arrayDate = data;
      console.log("arrayDate:::::", this.arrayDate);
      this.lineChartLabels = this.arrayDate;
      // Lógica para actualizar el gráfico con arrayDate
    });
    
    this.lineChartData = [
      { 
        data: this.arrayHours,
        label: 'Horas',
      }
    ];

    this.lineChartLabels = this.arrayDate;

  }

  ngAfterViewInit() {
    this.addHorizontalLine();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios en los datos++++++:', changes);
    console.log(changes);
  }
  
  addHorizontalLine() {
    const average = 1.5;  // Cambia esto según la hora deseada
    const ctx: any = document.getElementById('canvas');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: [{
          data: Array(this.lineChartLabels.length).fill(average),
          borderColor: 'green',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
