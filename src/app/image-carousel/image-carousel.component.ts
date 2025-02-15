import { Component } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent {
  images = [
    { src: 'assets/Images/habits2.jpg', alt: 'Imagen 2', caption: 'Registrar tus hábitos permite seguir tu progreso y obtener retroalimentación inmediata, manteniéndote motivado y en el camino hacia tus objetivos. - James Clear' },
    { src: 'assets/Images/Libro.jpg', alt: 'Imagen 1', caption: 'Torre-Soft es una herramienta Basada en el libro Hábitos Atómicos de James Clear, esta herramienta te permite registrar tus hábitos, seguir tu progreso y obtener retroalimentación inmediata, manteniéndote motivado y encaminado hacia tus objetivos' },
    { src: 'assets/Images/habits3.jpg', alt: 'Imagen 3', caption: '"Las personas que registran sus hábitos tienen un 42% más de probabilidades de alcanzar sus objetivos. Medir tu progreso regularmente es clave para mantener la motivación y mejorar continuamente."' }
  ];
  
  currentIndex = 0;
  translateX = '0%';

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.updateTranslateX();
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateTranslateX();
  }

  updateTranslateX() {
    this.translateX = `-${this.currentIndex * 100}%`;
  }
}
