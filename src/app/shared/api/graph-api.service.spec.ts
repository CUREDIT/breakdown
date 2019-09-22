import { TestBed } from '@angular/core/testing';

import { SimApiService } from './graph-api.service';

describe('SimApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimApiService = TestBed.get(SimApiService);
    expect(service).toBeTruthy();
  });
});
