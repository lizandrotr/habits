import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit {
  @Input() valorActual: number;
  @Input() valorMaximo: number;

  private readonly radio = 50; // Radio del círculo

  constructor() {
    this.valorActual = 0;
    this.valorMaximo = 100;
  }

  ngOnInit() {}

  getCircleRadius(): number {
    return this.radio;
  }

  getStrokeDashArray(): string {
    const circunferencia = 2 * Math.PI * this.radio;
    return `${circunferencia} ${circunferencia}`;
  }

  getStrokeDashOffset(): number {
    if (this.valorMaximo === 0) {
      return 0;
    }
    return (
      (2 * Math.PI * this.radio * (this.valorMaximo - this.valorActual)) /
      this.valorMaximo
    );
  }

  calcularPorcentaje(): number {
    if (this.valorMaximo === 0) {
      return 0;
    }
    return (this.valorActual / this.valorMaximo) * 100;
  }
}
