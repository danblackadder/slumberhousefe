import { capitalize } from 'utility/helper';

export enum TaskStatus {
  BACKLOG = 'backlog',
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
  due?: string;
  tags?: string[];
  users?: ITaskUser[];
}

export enum ViewMode {
  ROW = 1,
  COLUMN = 2,
}

export enum GroupBy {
  STATUS = 1,
  PRIORITY = 2,
}
