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

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
