import { TestBed } from '@angular/core/testing';

import { VisService } from './vis.service';

describe('VisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisService = TestBed.get(VisService);
    expect(service).toBeTruthy();
  });
});
