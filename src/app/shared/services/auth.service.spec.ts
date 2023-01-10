import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsAllowStubDirective, NgxPermissionsModule } from 'ngx-permissions';

import { AuthService } from './auth.service';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPermissionsAllowStubDirective],
      imports: [
        NgxPermissionsModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
