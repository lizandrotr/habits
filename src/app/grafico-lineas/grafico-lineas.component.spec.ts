import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLineasComponent } from './grafico-lineas.component';

describe('GraficoLineasComponent', () => {
  let component: GraficoLineasComponent;
  let fixture: ComponentFixture<GraficoLineasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoLineasComponent]
    });
    fixture = TestBed.createComponent(GraficoLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
