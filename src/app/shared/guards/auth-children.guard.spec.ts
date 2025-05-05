import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authChildrenGuard } from './auth-children.guard';

describe('authChildrenGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authChildrenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
