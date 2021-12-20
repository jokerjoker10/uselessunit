import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// matomo tracking
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
var instace: any;
if (process.env.MATOMO_URL) {
  console.log(process.env.MATOMO_URL)
  instace = createInstance({
    urlBase: process.env.MATOMO_URL || '',
    siteId: Number(process.env.MATOMO_SITE_ID) || 0,
    disabled: process.env.MATOMO_URL ? true : false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    heartBeat: { // optional, enabled by default
      active: true, // optional, default value: true
      seconds: 10 // optional, default value: `15
    },
    configurations: { // optional, default value: {}
      // any valid matomo configuration, all below are optional
      disableCookies: true,
      setSecureCookie: false,
      setRequestMethod: 'POST'
    }
  })
}

ReactDOM.render(
  <MatomoProvider value={instace}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MatomoProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
