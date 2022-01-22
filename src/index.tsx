import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import matomo from './config/config.json';

// Matomo Tracking
const instance = createInstance({
  urlBase: matomo.matomo.matomo_url,
  siteId: matomo.matomo.matomo_site_id,
  disabled: !matomo.matomo.use_matomo,
  configurations: {
    disableCookies: true,
    setSecureCookie: process.env.NODE_ENV != "development",
    setRequestMethod: 'POST'
  }
})

ReactDOM.render(
    <React.StrictMode>
      <MatomoProvider value={instance}>
       <App />
      </MatomoProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and loadsfaster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
