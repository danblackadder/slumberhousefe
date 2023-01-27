import { IPagination } from './generic.types';
import { GroupRole } from './settings.types';

export interface IGroup {
  _id: string;
  name: string;
  users: number;
  role: GroupRole;
  description?: string;
  image?: string;
}

export interface IGroupErrors {
  name: string[];
  image: string[];
}

export enum TabGroupOptions {
  ADD_NEW = 'AddNew',
  INVITE = 'Invite',
}

export interface IGroupUserResponse {
  users: IGroupUser[];
  pagination: IPagination;
}

export interface IGroupUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: GroupRole;
}
