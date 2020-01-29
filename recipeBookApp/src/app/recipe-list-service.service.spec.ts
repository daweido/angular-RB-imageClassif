import { TestBed } from '@angular/core/testing';

import { RecipeListServiceService } from './recipe-list-service.service';

describe('RecipeListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeListServiceService = TestBed.get(RecipeListServiceService);
    expect(service).toBeTruthy();
  });
});
