export enum TabSettingsOptions {
  ORGANIZATION = 'Organization',
  USERS = 'Users',
  GROUPS = 'Groups',
}

export interface IOrganizationSettingsErrors {
  name: string[];
}

export interface IUserSetting {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export interface IUserPostErrors {
  email: string[];
}
