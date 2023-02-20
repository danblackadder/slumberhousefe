import { capitalize } from 'utility/helper';

import { IOption, IPagination } from './generic.types';
import { IGroup } from './group.types';
import { IUser } from './profile.types';

export enum OrganizationTabSettings {
  ORGANIZATION = 'organization',
  USERS = 'users',
  GROUPS = 'groups',
}

export enum GroupTabSettings {
  GROUP = 'group',
  USERS = 'users',
}

export interface IOrganizationSettingsErrors {
  name: string[];
}

export enum UserStatus {
  INVITED = 'invited',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const UserStatusOptions = Object.values(UserStatus).map((value) => {
  return { value, label: capitalize(value) };
}) as IOption<UserStatus>[];

export enum OrganizationRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  BASIC = 'basic',
}

export const OrganizationRoleOptions = Object.values(OrganizationRole).map((value) => {
  return { value, label: capitalize(value) };
}) as IOption<OrganizationRole>[];

export enum GroupRole {
  ADMIN = 'admin',
  BASIC = 'basic',
  EXTERNAL = 'external',
}

export const GroupRoleOptions = Object.values(GroupRole).map((value) => {
  return { value, label: capitalize(value) };
}) as IOption<GroupRole>[];

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
  groups: IGroup[];
  pagination: IPagination;
}

export interface IGroupSettingPostErrors {
  name: string[];
  image: string[];
}
