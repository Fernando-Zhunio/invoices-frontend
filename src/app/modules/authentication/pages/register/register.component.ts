import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private serviceAuth: AuthService, private serviceStorage: StorageService, private router: Router) { }

  isLoadingForm = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
  })

  register() {
    this.isLoadingForm = true;
    this.serviceAuth.register(this.form.value)
      .subscribe(
        {
          next: (res) => {
            this.serviceStorage.saveSession(HelperService.convertAuthResponseToSession(res));
            this.router.navigate(['/']);
          },
          error: () => {
            this.isLoadingForm = false;
          }
        }
      );
  }

}
