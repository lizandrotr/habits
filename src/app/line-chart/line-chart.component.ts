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

  arrayHours: number[] = []; 
  arrayDate: string[] = []; 

  private hoursArraySubscription: Subscription = new Subscription();
  private fechasArraySubscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  lineChartData = [
    { 
      data: this.arrayHours,
      label: 'Horas',
      borderColor: '#239089',  // Establece el color de la línea aquí
      backgroundColor: '#239089'
    }
  ];
  
  lineChartLabels: string[] = this.arrayDate;

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false, // Asegura que el gráfico se adapta al tamaño del contenedor
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
    // Configuraciones adicionales (si las hay)
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    this.hoursArraySubscription = this.dataService.hoursArray$.subscribe((data) => {
      this.arrayHours = data;
      this.lineChartData[0].data = this.arrayHours;
    });

    this.fechasArraySubscription = this.dataService.fechasArray$.subscribe((data) => {
      this.arrayDate = data;
      this.lineChartLabels = this.arrayDate;
    });
  }

  ngAfterViewInit() {
    this.addHorizontalLine();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Manejo de cambios
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
          borderColor: '#239089', // Cambiar aquí para la línea horizontal
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
