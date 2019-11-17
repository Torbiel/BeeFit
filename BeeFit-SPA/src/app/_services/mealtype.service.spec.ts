/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MealtypeService } from './mealtype.service';

describe('Service: Mealtype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MealtypeService]
    });
  });

  it('should ...', inject([MealtypeService], (service: MealtypeService) => {
    expect(service).toBeTruthy();
  }));
});
