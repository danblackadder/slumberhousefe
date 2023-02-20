import { ActionMap } from './generic.types';
import { IUser } from './profile.types';

export enum UserContextActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  USER = 'USER',
}

export interface UserContextState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface UserContextPayload {
  [UserContextActionTypes.LOGIN]: {
    token: string;
  };
  [UserContextActionTypes.LOGOUT]: undefined;
  [UserContextActionTypes.USER]: {
    user: IUser;
  };
}

export type UserContextActions = ActionMap<UserContextPayload>[keyof ActionMap<UserContextPayload>];

export interface UserContextType {
  state: UserContextState;
  dispatch: React.Dispatch<UserContextActions>;
}
