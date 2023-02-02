import axios from 'axios';

import { ITask } from 'models/task.types';

export const getGroupTasks = async ({ groupId }: { groupId: string }) => {
  return new Promise<ITask[]>((resolve, reject) => {
    axios
      .get(`/tasks/${groupId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
