import { capitalize } from 'utility/helper';
import { IOption, IPagination } from './generic.types';

export enum TabSettings {
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
