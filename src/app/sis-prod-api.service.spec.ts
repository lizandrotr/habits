import { TestBed } from '@angular/core/testing';

import { SisProdApiService } from './sis-prod-api.service';

describe('SisProdApiService', () => {
  let service: SisProdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SisProdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
