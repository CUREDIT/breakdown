import { TestBed } from '@angular/core/testing';

import { InMemoryNetApiService } from './in-memory-net-api.service';

describe('InMemoryNetApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryNetApiService = TestBed.get(InMemoryNetApiService);
    expect(service).toBeTruthy();
  });
});
