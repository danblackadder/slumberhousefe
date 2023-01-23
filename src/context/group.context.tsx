import {
  GroupContextActions,
  GroupContextActionTypes,
  GroupContextState,
  GroupContextType,
} from 'models/group.context.types';
import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  group: null,
};

const reducer = (state: GroupContextState, action: GroupContextActions) => {
  switch (action.type) {
    case GroupContextActionTypes.SET_GROUP:
      return {
        ...state,
        group: action.payload.group,
      };
    case GroupContextActionTypes.REMOVE_GROUP:
      return {
        ...state,
        group: null,
      };
    default:
      return state;
  }
};

const GroupContext = createContext<GroupContextType>({ state: initialState, dispatch: () => null });

const GroupProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GroupContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };
