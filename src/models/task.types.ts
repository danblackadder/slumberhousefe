import { capitalize } from 'utility/helper';

export enum TaskStatus {
  DRAFT = 'draft',
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
  IN_REVIEW = 'in review',
  COMPLETED = 'completed',
}

export const TaskStatusOptions = Object.values(TaskStatus).map((item) => {
  return { value: item, label: capitalize(item) };
});

export enum TaskPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export const TaskPriorityOptions = Object.values(TaskPriority).map((item) => {
  return { value: item, label: capitalize(item) };
});

export interface ITaskUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ITask {
  _id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  due?: Date;
  tags?: string[];
  users?: ITaskUser[];
}
