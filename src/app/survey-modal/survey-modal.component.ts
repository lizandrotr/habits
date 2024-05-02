import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.css']
})
export class SurveyModalComponent {
  rating = 0;
  comment = '';

  rate(star: number) {
    this.rating = star;
  }

  get data() {
    return { rating: this.rating, comment: this.comment };
  }
}
