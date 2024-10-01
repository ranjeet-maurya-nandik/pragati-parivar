import { TestBed } from '@angular/core/testing';

import { BarsBtnService } from '../bars-btn.service';

describe('BarsBtnService', () => {
  let service: BarsBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarsBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
