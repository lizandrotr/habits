import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleprojectComponent } from './moduleproject.component';

describe('ModuleprojectComponent', () => {
  let component: ModuleprojectComponent;
  let fixture: ComponentFixture<ModuleprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
