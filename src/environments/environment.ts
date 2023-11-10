// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://127.0.0.1:8000/api',
  baseUrl: 'http://127.0.0.1:8000',
  clientUrl: 'http://127.0.0.1:4200',
  maxWidthCover: 1000,
  maxHeightCover: 400,
  firebase: {
    apiKey: 'AIzaSyBERjm6nvJubSHoBkkmwBDAyfb1mCL55nM',
    authDomain: 'grintaaa.firebaseapp.com',
    projectId: 'grintaaa',
    storageBucket: 'grintaaa.appspot.com',
    messagingSenderId: '52047750060',
    appId: '1:52047750060:web:af335191bf0e8e2ffcd009',
    databaseURL: 'https://grintaaa.firebaseio.com'
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
