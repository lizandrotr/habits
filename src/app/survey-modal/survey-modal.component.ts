import { Component } from '@angular/core';
import { SurveyapiService } from '../service/surveyapi.service'; 
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.css']
})
export class SurveyModalComponent {

  constructor(private surveyApiService: SurveyapiService, public dialog: MatDialog) {}

  rating = 0;
  comment: string = '';
  showPopup: boolean = true;

  projectForm = new FormGroup({
    description: new FormControl('', Validators.required)
  });
  
  rate(star: number) {
    this.rating = star;
  }


  get data() {
    return { rating: this.rating, comment: this.comment };
  }

  onSubmit() {
    const formData = this.projectForm.value;
    console.log("data description",formData.description);
    const data = {
      timestamp: new Date().toISOString(), // Formato ISO de la fecha y hora actual
      userId: 1, // Asegúrate de reemplazar esto con el ID del usuario real si es necesario
      csat: this.rating,
      comment: formData.description
    };

    this.surveyApiService.sendSurveyResponse(data).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.dialog.closeAll(); // Cierra el modal después de enviar los datos
      },
      error: (error) => {
        console.error('Error al enviar datos:', error);
      }
    });
  }

  closePopup(): void {
    this.showPopup = false;
  }
  ngOnInit() {
    this.comment = localStorage.getItem('comment') || '';
  }
}
