import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Cookies from 'js-cookie';

import App from './App';

import 'styles/app.scss';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use(
  (config) => {
    if (Cookies.get('token')) {
      config.headers = {
        Authorization: `Bearer ${Cookies.get('token')}`,
      };
    } else {
      config.headers = {
        Authorization: null,
      };
    }

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);
  root.render(<App />);

  if (module.hot) {
    module.hot.accept('./App', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const UpdatedApp = require('./App').default;
      root.render(<UpdatedApp />);
    });
  }
});
