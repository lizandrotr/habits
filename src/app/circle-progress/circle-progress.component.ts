import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit {
  @Input() valorActual: number;
  @Input() valorMaximo: number;

  radio = 35; // Radio del círculo
  strokeDashArray: number;
  currentStrokeDashOffset: number;
  finalStrokeDashOffset: number;
  
  ngOnInit() {
    this.strokeDashArray = 2 * Math.PI * this.radio;
    this.currentStrokeDashOffset = this.strokeDashArray;
    this.finalStrokeDashOffset = this.strokeDashArray * (1 - (this.valorActual / this.valorMaximo));

    const animationDuration = 2000; // Duración de la animación en milisegundos
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = animationDuration / frameRate;
    let currentFrame = 0;

    const animate = () => {
      if (currentFrame <= totalFrames) {
        this.currentStrokeDashOffset = this.finalStrokeDashOffset + (this.strokeDashArray - this.finalStrokeDashOffset) * ((totalFrames - currentFrame) / totalFrames);
        currentFrame++;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  constructor() {
    this.valorActual = 1;
    this.valorMaximo = 2;

    this.strokeDashArray = 2 * Math.PI * this.radio;
    this.currentStrokeDashOffset = this.strokeDashArray;
    this.finalStrokeDashOffset = this.strokeDashArray;
  }

  getCircleRadius(): number {
    return this.radio;
  }

  /*getStrokeDashArray(): string {
    const circunferencia = 2 * Math.PI * this.radio;
    return `${circunferencia} ${circunferencia}`;
  }*/

  getStrokeDashArray(): number {
    return 2 * Math.PI * this.radio;
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

  initialStrokeDashOffset(): number {
    const percentage = this.valorActual / this.valorMaximo;
    // Este cálculo representa la parte no completada del círculo
    return this.getStrokeDashArray() * (1 - percentage);
  }

}
