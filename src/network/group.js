import axios from 'axios';
export const getGroup = async ({ groupId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/groups/${groupId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const getGroups = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/groups`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const postGroup = async ({ name, description, image }) => {
  return new Promise((resolve, reject) => {
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
export const getGroupUsers = async ({ groupId, page }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/groups/${groupId}/users?limit=10&page=${page}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const getGroupAvailableUsers = async ({ groupId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/groups/${groupId}/users/available`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const postGroupUsers = async ({ groupId, userId, role }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/groups/${groupId}/users/${userId}`, { role })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
export const removeGroupUser = async ({ groupId, userId }) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/groups/${groupId}/users/${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
