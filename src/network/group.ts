import axios, { AxiosResponse } from 'axios';

import { IGroup, IGroupAvailableUser, IGroupUserResponse } from 'models/group.types';
import { GroupRole } from 'models/settings.types';

export const getGroup = async ({ groupId }: { groupId: string }) => {
  return new Promise<IGroup>((resolve, reject) => {
    axios
      .get(`/groups/${groupId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getGroups = async () => {
  return new Promise<IGroup[]>((resolve, reject) => {
    axios
      .get(`/groups`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postGroup = async ({
  name,
  description,
  image,
}: {
  name: string;
  description?: string;
  image?: File[];
}) => {
  return new Promise<IGroup>((resolve, reject) => {
    const formData = new FormData();

    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image && image.length > 0) formData.append('image', image[0]);

    axios
      .post(`/groups`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getGroupUsers = async ({ groupId, page }: { groupId: string; page: number }) => {
  return new Promise<IGroupUserResponse>((resolve, reject) => {
    axios
      .get(`/groups/${groupId}/users?limit=10&page=${page}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getGroupAvailableUsers = async ({ groupId }: { groupId: string }) => {
  return new Promise<IGroupAvailableUser[]>((resolve, reject) => {
    axios
      .get(`/groups/${groupId}/users/available`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const postGroupUsers = async ({
  groupId,
  userId,
  role,
}: {
  groupId: string;
  userId: string;
  role: GroupRole;
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/groups/${groupId}/users/${userId}`, { role })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const putGroupUser = async ({ groupId, userId, role }: { groupId: string; userId: string; role: GroupRole }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .put(`/groups/${groupId}/users/${userId}`, { role })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const removeGroupUser = async ({ groupId, userId }: { groupId: string; userId: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .delete(`/groups/${groupId}/users/${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
