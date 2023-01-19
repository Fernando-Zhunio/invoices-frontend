import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './shared/class/custom.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StorageService } from './shared/services/storage.service';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DATA_FOR_SEARCH_BAR } from 'ngx-search-bar-fz';
import { environment } from 'src/environments/environment';

function initializeApp(storage: StorageService): any {
  return () => {
    const session = storage.getSessionLocalStorage();
    console.log(session);
    if (session) {
      storage.saveSession(session);
    }
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [StorageService],
      multi: true,
    },
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
        BASE_URL: environment.serverUrlApi
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
