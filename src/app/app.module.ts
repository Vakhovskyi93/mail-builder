import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
  Provider,
} from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuards } from 'src/app/auth.guard';
import { LoginedGuards } from 'src/app/logined.guard';
import { UserService } from 'src/app/services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterseptor } from './interceptors/error.interceptor';

const ERROR_INTERSEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterseptor,
  multi: true,
};
const AUTH_INTERSEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatSnackBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ERROR_INTERSEPTOR,
    AUTH_INTERSEPTOR,
    UserService,
    AuthGuards,
    LoginedGuards,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
