import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ITask, ITaskUser, TaskPriority, TaskStatus } from 'models/task.types';

export const useGroupTasks = ({ groupId, pauseStream }: { groupId: string | undefined; pauseStream: boolean }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (groupId) {
      const source = new EventSource(`${process.env.API_URL}/tasks/${groupId}`, { withCredentials: true });

      source.onmessage = (e) => {
        if (pauseStream) return;
        console.log(JSON.parse(e.data));
        setTasks(JSON.parse(e.data));
        setLoading(false);
      };

      source.onerror = (err: unknown) => {
        if (pauseStream) return;
        console.log(err);
        setError('An error occured');
        source.close();
        setLoading(false);
      };

      return () => {
        source.close();
      };
    }
  }, [groupId, pauseStream]);

  return { tasks, error, loading };
};

export const postGroupTask = ({
  groupId,
  title,
  status,
  description,
  priority,
  due,
  tags,
  users,
}: {
  groupId: string | undefined;
  title: string;
  status: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  due?: Date;
  tags?: string[];
  users?: string[];
}) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios
      .post(`/tasks/${groupId}`, { title, status, description, priority, due, tags, users })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getTaskTags = ({ groupId }: { groupId: string | undefined }) => {
  return new Promise<string[]>((resolve, reject) => {
    axios
      .get(`/tasks/${groupId}/tags`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};

export const getTaskUsers = ({ groupId }: { groupId: string | undefined }) => {
  return new Promise<ITaskUser[]>((resolve, reject) => {
    axios
      .get(`/tasks/${groupId}/users`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
