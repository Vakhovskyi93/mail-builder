import { InjectionToken } from '@angular/core';

import { environment } from 'src/environments/environment';

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
}

export const ENVIRONMENT = new InjectionToken<IEnvironment>(
  'An abstraction over application environment',
  {
    providedIn: 'root',
    factory: () => environment,
  }
);
