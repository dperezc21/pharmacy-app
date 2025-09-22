import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    provideHttpClient(withFetch()), provideNativeDateAdapter()]
};
