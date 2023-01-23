import axios from 'axios';
import { IGroup } from 'models/group.types';

export const getGroup = async ({ groupId }: { groupId: string }) => {
  return new Promise<IGroup>((resolve, reject) => {
    axios
      .get(`/group/${groupId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getGroups = async () => {
  return new Promise<IGroup[]>((resolve, reject) => {
    axios
      .get(`/group`)
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
      .post(`/group`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
