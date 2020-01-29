import { TestBed } from '@angular/core/testing';

import { RecipeFilterService } from './recipe-filter.service';

describe('RecipeFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeFilterService = TestBed.get(RecipeFilterService);
    expect(service).toBeTruthy();
  });
});
