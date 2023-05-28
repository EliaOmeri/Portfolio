import { TestBed } from '@angular/core/testing';

import { FactsServiceService } from './facts-service.service';

describe('FactsServiceService', () => {
  let service: FactsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
