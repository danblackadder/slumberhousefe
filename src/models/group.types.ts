export interface IGroup {
  name: string;
  users: number;
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
