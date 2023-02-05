import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ITask, TaskStatus } from 'models/task.types';

export const useGroupTasks = ({ groupId, pauseStream }: { groupId: string | undefined; pauseStream: boolean }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let source = new EventSource(`${process.env.API_URL}/tasks/${groupId}`, { withCredentials: true });

    source.onmessage = (e) => {
      if (pauseStream) return;
      setTasks(JSON.parse(e.data));
    };

    source.onerror = (err: unknown) => {
      if (pauseStream) return;
      console.log(err);
      setError('An error occured');
      source.close();
    };

    return () => {
      source.close();
    };
  }, [groupId, pauseStream]);

  return { tasks, error };
};

export const postGroupTask = ({ groupId, title }: { groupId: string | undefined; title: string }) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/tasks/${groupId}`, { title, status: TaskStatus.DRAFT })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
