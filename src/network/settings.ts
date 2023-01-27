import axios, { AxiosResponse } from 'axios';

import { IGroupSettingResponse, IUserSettingResponse, OrganizationRole } from 'models/settings.types';

export const getSettingsUsers = async ({ page }: { page: number }) => {
  return new Promise<IUserSettingResponse>((resolve, reject) => {
    axios
      .get(`/settings/users?limit=10&page=${page}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postSettingsUsers = async ({ email }: { email: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/settings/users`, { email })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const putSettingsUser = async ({ id, role }: { id: string; role: OrganizationRole }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .put(`/settings/users/${id}`, { role })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const deleteSettingsUser = async ({ id }: { id: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .delete(`/settings/users/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getSettingsGroups = async ({ page }: { page: number }) => {
  return new Promise<IGroupSettingResponse>((resolve, reject) => {
    axios
      .get(`/settings/groups?limit=10&page=${page}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postSettingsGroups = async ({
  name,
  description,
  image,
}: {
  name: string;
  description?: string;
  image?: File[];
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const formData = new FormData();

    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image && image.length > 0) formData.append('image', image[0]);

    axios
      .post(`/settings/groups`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const putSettingsGroups = async ({
  id,
  name,
  description,
  image,
}: {
  id: string;
  name: string;
  description?: string;
  image?: File[];
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const formData = new FormData();

    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image && image.length > 0) formData.append('image', image[0]);

    axios
      .put(`/settings/groups/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const deleteSettingsGroups = async ({ id }: { id: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .delete(`/settings/groups/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
