import { OrganizationRole } from './settings.types';

export interface IProfileErrors {
  firstName: string[];
  lastName: string[];
  email: string[];
  image: string[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: OrganizationRole;
  image?: string;
}
