import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import 'styles/app.scss';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8001';

axios.interceptors.request.use(
  (config) => {
    console.log(Cookies.get('token'));
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

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
