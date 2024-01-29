/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdsObsService } from './AdsObs.service';

describe('Service: AdsObs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsObsService]
    });
  });

  it('should ...', inject([AdsObsService], (service: AdsObsService) => {
    expect(service).toBeTruthy();
  }));
});
