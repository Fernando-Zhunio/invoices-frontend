import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private serviceAuth: AuthService, private serviceStorage: StorageService, private router: Router) { }

  isLoadingForm = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
  })

  ngOnInit(): void {
  }

  login() {
    this.isLoadingForm = true;
    this.serviceAuth.login(this.form.value)
      .subscribe(
        {
          next: (res) => {
            this.serviceStorage.saveSession(HelperService.convertAuthResponseToSession(res));
            this.router.navigate(['/']);
            this.isLoadingForm = false;
          },
          error: () => {
            this.isLoadingForm = false;
          }
        }
      );
  }
}
