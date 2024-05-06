import { TestBed } from '@angular/core/testing';

import { SurveyapiService } from './surveyapi.service';

describe('SurveyapiService', () => {
  let service: SurveyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
