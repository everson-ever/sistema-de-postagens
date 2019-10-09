import { TestBed, async, inject } from '@angular/core/testing';

import { GuestGuardGuard } from './guest-guard.guard';

describe('GuestGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestGuardGuard]
    });
  });

  it('should ...', inject([GuestGuardGuard], (guard: GuestGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
