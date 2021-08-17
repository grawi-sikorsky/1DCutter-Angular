import { TestBed } from '@angular/core/testing';

import { CutterServiceService } from './cutter-service.service';

describe('CutterServiceService', () => {
  let service: CutterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
