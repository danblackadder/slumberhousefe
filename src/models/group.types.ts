import { IUser } from './authentication.types';
import { IPagination } from './generic.types';
import { GroupRole } from './settings.types';

export interface IGroup {
  _id: string;
  name: string;
  users: IUser[];
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

export interface IGroupAvailableUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
