import { TestBed } from '@angular/core/testing';

import { TokenDecodedService } from './token-decoded.service';

describe('TokenDecodedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenDecodedService = TestBed.get(TokenDecodedService);
    expect(service).toBeTruthy();
  });
});
