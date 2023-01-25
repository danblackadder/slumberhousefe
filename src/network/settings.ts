import axios, { AxiosResponse } from 'axios';
import { IUserSettingResponse, OrganizationRole } from 'models/settings.types';

export const getUsers = async ({ page }: { page: number }) => {
  return new Promise<IUserSettingResponse>((resolve, reject) => {
    axios
      .get(`/settings/users?limit=10&page=${page}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postUsers = async ({ email }: { email: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/settings/users`, { email })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const putUser = async ({ id, role }: { id: string; role: OrganizationRole }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .put(`/settings/users/${id}`, { role })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const deleteUser = async ({ id }: { id: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .delete(`/settings/users/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
