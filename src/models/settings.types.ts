import { IPagination } from './generic.types';

export enum TabSettingsOptions {
  ORGANIZATION = 'organization',
  USERS = 'users',
  GROUPS = 'groups',
}

export interface IOrganizationSettingsErrors {
  name: string[];
}

export enum UserStatus {
  INVITED = 'invited',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum OrganizationRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  BASIC = 'basic',
}

export enum GroupRole {
  ADMIN = 'admin',
  BASIC = 'basic',
  EXTERNAL = 'external',
}

export interface IUserSettingResponse {
  users: IUserSetting[];
  pagination: IPagination;
}
export interface IUserSetting {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: UserStatus;
}

export interface IUserSettingPostErrors {
  email: string[];
}

export interface IGroupSettingResponse {
  groups: IGroupSetting[];
  pagination: IPagination;
}
export interface IGroupSetting {
  _id: string;
  name: string;
  users: number;
  role: GroupRole;
  description?: string;
  image?: string;
}

export interface IGroupSettingPostErrors {
  name: string[];
  image: string[];
}
