import { TestBed } from '@angular/core/testing';

import { GenerateKeyAuthService } from './generate-key-auth.service';

describe('GenerateKeyAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateKeyAuthService = TestBed.get(GenerateKeyAuthService);
    expect(service).toBeTruthy();
  });
});
