import axios, { AxiosResponse } from 'axios';

import { ILogin } from 'models/authentication.types';

export const login = ({ email, password }: { email: string; password: string }) => {
  console.log('axiosLogin');
  return new Promise<ILogin>((resolve, reject) => {
    axios
      .post('/authentication/login', { email, password })
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log(err);
        reject(err.response.data);
      });
  });
};

export const register = ({
  firstName,
  lastName,
  email,
  organization,
  password,
  passwordConfirmation,
}: {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  password: string;
  passwordConfirmation: string;
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post('/authentication/register', { firstName, lastName, email, organization, password, passwordConfirmation })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
