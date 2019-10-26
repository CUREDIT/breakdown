import { async, TestBed } from '@angular/core/testing';
import { LibcureditModule } from './libcuredit.module';

describe('LibcureditModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LibcureditModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LibcureditModule).toBeDefined();
  });
});
