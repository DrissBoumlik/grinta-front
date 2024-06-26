// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  SCARF_ANALYTICS: false,
  production: false,
  baseApiUrl: 'http://127.0.0.1:8000/api',
  baseUrl: 'http://127.0.0.1:8000',
  maxWidthCover: 1000,
  maxHeightCover: 400,
  firebase: {
    apiKey: 'AIzaSyBERjm6nvJubSHoBkkmwBDAyfb1mCL55nM',
    authDomain: 'grintaaa.firebaseapp.com',
    databaseURL: 'https://grintaaa.firebaseio.com',
    projectId: 'grintaaa',
    storageBucket: 'grintaaa.appspot.com',
    messagingSenderId: '52047750060',
    appId: '1:52047750060:web:af335191bf0e8e2ffcd009'
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
