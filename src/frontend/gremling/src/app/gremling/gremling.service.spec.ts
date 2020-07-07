import { TestBed } from '@angular/core/testing';

import { GremlingService } from './gremling.service';

describe('GremlingService', () => {
  let service: GremlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GremlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
