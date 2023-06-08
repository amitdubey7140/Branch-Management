import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthInterceptor } from './core/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { ShareModule } from './shared/share.module';
import { ErrorHandlingInterceptor } from './core/error-handling.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    HttpClientModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      iconClasses: {
        error: 'toast-error',
      },
    }),
    ShareModule,
    TabsModule.forRoot(),
    NgxUiLoaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
