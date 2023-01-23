import axios, { AxiosResponse } from 'axios';
import { IUserSetting } from 'models/settings.types';

export const getUsers = async () => {
  return new Promise<IUserSetting[]>((resolve, reject) => {
    axios
      .get(`/users`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postUsers = async ({ email }: { email: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/users`, { email })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
