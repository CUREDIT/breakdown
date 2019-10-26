// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { apiKey } from './apiKey';

export const environment = {
  production: false,
  firebase: {
    apiKey,
    authDomain: 'curedit-283fc.firebaseapp.com',
    databaseURL: 'https://curedit-283fc.firebaseio.com',
    projectId: 'curedit-283fc',
    storageBucket: '',
    messagingSenderId: '602111485239',
    appId: '1:602111485239:web:001e506230e6f2697e26b2',
    measurementId: 'G-CHVQS6NY2T'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

