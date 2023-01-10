import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgxPermissionsAllowStubDirective } from 'ngx-permissions';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPermissionsAllowStubDirective],
      providers: [{
        provide: AuthService,
        useValue: {
          logout: () => { }
        }
      }],

    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate pass', () => {
    // si es una ruta guest
    const dummyRoute = { data: { guard: "guest" } } as unknown as ActivatedRouteSnapshot;
    // no estoy autenticado
    spyOn(HelperService, 'isAuthenticated').and.returnValue(false);
    let isPass = guard.canActivate(dummyRoute, fakeRouterState('/home'));
    expect(isPass).toBeTrue();
    
    // no es una ruta guest
    const dummyRoute2 = { data: { guard: "auth" } } as unknown as ActivatedRouteSnapshot;
    // si estoy autenticado
    HelperService.isAuthenticated = jasmine.createSpy().and.returnValue(true);
    isPass = guard.canActivate(dummyRoute2, fakeRouterState('/home'));
    expect(isPass).toBeTrue();

  });

  it('canActivate no pass', () => {
    // si es una ruta guest
    const dummyRoute = { data: { guard: "guest" } } as unknown as ActivatedRouteSnapshot;
    // si estoy autenticado
    spyOn(HelperService, 'isAuthenticated').and.returnValue(true);
    let isPass = guard.canActivate(dummyRoute, fakeRouterState('/home'));
    expect(isPass).toBeFalse();
    
    // no es una ruta guest
    const dummyRoute2 = { data: { guard: "auth" } } as unknown as ActivatedRouteSnapshot;
    // si estoy autenticado
    HelperService.isAuthenticated = jasmine.createSpy().and.returnValue(false);
    isPass = guard.canActivate(dummyRoute2, fakeRouterState('/home'));
    expect(isPass).toBeFalse();

  });
});

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

const fakeHelperService = (value: boolean) => {
 return { isAuthenticated: () => value}
}