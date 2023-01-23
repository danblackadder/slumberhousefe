import { ActionMap } from './generic.types';
import { IGroup } from './group.types';

export enum GroupContextActionTypes {
  SET_GROUP = 'SET_GROUP',
  REMOVE_GROUP = 'REMOVE_GROUP',
}

export interface GroupContextState {
  group: IGroup | null;
}

export interface GroupContextPayload {
  [GroupContextActionTypes.SET_GROUP]: {
    group: IGroup;
  };
  [GroupContextActionTypes.REMOVE_GROUP]: undefined;
}

export type GroupContextActions = ActionMap<GroupContextPayload>[keyof ActionMap<GroupContextPayload>];

export interface GroupContextType {
  state: GroupContextState;
  dispatch: React.Dispatch<GroupContextActions>;
}
