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

export const putGroup = async ({
  id,
  name,
  description,
  image,
  widgets,
}: {
  id: string;
  name: string;
  description?: string;
  image?: File[];
  widgets?: string[];
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const formData = new FormData();

    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image && image.length > 0) formData.append('image', image[0]);
    if (widgets) formData.append('widgets', widgets.toString());

    axios
      .put(`/groups/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getGroupUsers = async ({
  groupId,
  page,
  sortName,
  sortEmail,
  sortRole,
  filterRole,
  filterNameEmail,
}: {
  groupId: string;
  page: number;
  sortName: number;
  sortEmail: number;
  sortRole: number;
  filterRole: GroupRole | undefined;
  filterNameEmail: string;
}) => {
  return new Promise<IGroupUserResponse>((resolve, reject) => {
    let requestUrl = `/groups/${groupId}/users?limit=10`;

    if (page) {
      requestUrl = `${requestUrl}&page=${page}`;
    }

    if (sortName !== 0) {
      requestUrl = `${requestUrl}&sortName=${sortName}`;
    }

    if (sortEmail !== 0) {
      requestUrl = `${requestUrl}&sortEmail=${sortEmail}`;
    }

    if (sortRole !== 0) {
      requestUrl = `${requestUrl}&sortRole=${sortRole}`;
    }

    if (filterRole) {
      requestUrl = `${requestUrl}&filterRole=${filterRole}`;
    }

    if (filterNameEmail.length > 0) {
      requestUrl = `${requestUrl}&filterNameEmail=${filterNameEmail}`;
    }

    axios
      .get(requestUrl)
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
