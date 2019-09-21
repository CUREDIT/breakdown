import { TestBed } from '@angular/core/testing';

import { D3SimService } from './d3-sim.service';

describe('D3simService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: D3SimService = TestBed.get(D3SimService);
    expect(service).toBeTruthy();
  });
});
