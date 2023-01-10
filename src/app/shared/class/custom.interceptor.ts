import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private sa: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = new HttpHeaders();
    const isAuthenticated = HelperService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      headers = this.createHeader();
    }
    if (HelperService.disabledLoaderInterceptor) {
      HelperService.disabledLoaderInterceptor = false;
    } else {
      this.snackBar.open('Espere un momento...');
    }

    const newRequest = request.clone({ headers });

    return next.handle(newRequest).pipe(
      finalize(() => {
        this.snackBar.dismiss();
      }),
      catchError((err) => {
        this.snackBar.dismiss();
        if (err.status === 401 || err.status === 403) { this.sa.logout(); }
        console.log(err.status, err.error);
        const message = this.getStatusMessage(err.status, err.error);
        // SwalService.swalToast(message, 'warning')
        alert(message);
        return throwError(err);
      })
    );
  }

  // hasInternet(): boolean {
  //   const condition = navigator.onLine ? 'online' : 'offline';
  //   if (condition === 'offline') {
  //     SwalService.swalFire({ allowOutsideClick: false, showConfirmButton: true, confirmButtonText: 'Recargar pagina', title: 'No hay conexion a internet', text: 'Por favor revise su conexion a internet', icon: 'warning' })
  //       .then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
  //       }
  //     });
  //     return false;
  //   }
  //   return true;
  // }

  createHeader() {
    const header = new HttpHeaders({
      accept: 'application/json',
      Authorization: 'Bearer ' + HelperService.Token(),
    });
    return header;
  }

  getStatusMessage(status: number, message?: any) {
    console.log({status, message})
    const statusMessage: {[key:number]: string} = {
      400: 'Error de validación',
      401: 'No autenticado',
      403: 'No autorizado',
      404: 'Recurso no encontrado',
      500: 'Error interno de servidor',
      422: 'Error de validación',
    };
    if (status === 422 || status === 400) {
      return convertMessageValidation(message);
    }
    else if (statusMessage.hasOwnProperty(status)) {
      return statusMessage[status] + ' (' + status + ')';
    }
    return 'Error de servidor';
  }
}


function convertMessageValidation(messages: unknown): string {
  if (!messages || typeof messages !== 'object' || !messages.hasOwnProperty('errors')) {
    return '';
  }
  type Error = {[key: string]: Array<string>} | Array<{code: string, description: string}>;
  const errors = (messages as {errors: Error}).errors ;
    if (Array.isArray(errors)) {
      return errors.map((error) => error.description).join(' ');
    }
    return Object.values(errors).map((error) => error.join(' ')).join(' ');
}