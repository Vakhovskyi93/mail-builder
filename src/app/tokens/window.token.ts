import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<any>(
  'An abstraction over global window object',
  { providedIn: 'root', factory: () => window }
);
 
