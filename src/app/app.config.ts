import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr} from 'ngx-toastr';
import {provideHttpClient} from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxEchartsModule} from 'ngx-echarts';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      })
    )
  ]
};
