import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PulseService {
  private pulseSource = new BehaviorSubject<number | null>(null);
  currentPulse = this.pulseSource.asObservable();

  constructor() {}

  activatePulse(circleId: number | null) {
    this.pulseSource.next(circleId);
  }

  deactivatePulse() {
    this.pulseSource.next(null);
  }
}
