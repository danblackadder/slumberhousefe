import { OrganizationRole } from './settings.types';

export interface ILogin {
  token: string;
}

export interface IRegistrationErrors {
  firstName: string[];
  lastName: string[];
  email: string[];
  organization: string[];
  password: string[];
  passwordConfirmation: string[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: OrganizationRole;
  image?: string;
}
