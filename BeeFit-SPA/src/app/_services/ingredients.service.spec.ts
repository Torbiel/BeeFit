/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IngredientsService } from './ingredients.service';

describe('Service: Ingredients', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientsService]
    });
  });

  it('should ...', inject([IngredientsService], (service: IngredientsService) => {
    expect(service).toBeTruthy();
  }));
});
