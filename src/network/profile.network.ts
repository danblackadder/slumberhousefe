import axios, { AxiosResponse } from 'axios';

import { IUser } from 'models/profile.types';

export const getUser = async () => {
  return new Promise<IUser>((resolve, reject) => {
    axios
      .get('/profile')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const putProfile = async ({
  userId,
  email,
  firstName,
  lastName,
  image,
}: {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: File[];
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const formData = new FormData();

    formData.append('email', email);
    if (firstName) formData.append('firstName', firstName);
    if (lastName) formData.append('lastName', lastName);
    if (image && image.length > 0) formData.append('image', image[0]);

    axios
      .put(`/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
