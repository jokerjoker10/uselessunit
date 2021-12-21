import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import config from './config/config';

// matomo tracking
import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react'
var instace: any;
if (config.matomo.use_matomo) {
  instace = createInstance({
    urlBase: config.matomo.matomo_url,
    siteId: config.matomo.matomo_site_id,
    disabled: config.matomo.use_matomo,
    configurations: {
      disableCookies: true,
      setSecureCookie: true,
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
