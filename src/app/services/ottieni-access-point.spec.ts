import { TestBed } from '@angular/core/testing';

import { OttieniAccessPoint } from './ottieni-access-point';

describe('OttieniAccessPoint', () => {
  let service: OttieniAccessPoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OttieniAccessPoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
