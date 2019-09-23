import { TestBed, async, inject } from '@angular/core/testing';

import { ConfGuard } from './conf.guard';

describe('ConfGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfGuard]
    });
  });

  it('should ...', inject([ConfGuard], (guard: ConfGuard) => {
    expect(guard).toBeTruthy();
  }));
});
