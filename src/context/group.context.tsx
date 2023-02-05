import React, { createContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import {
  GroupContextActions,
  GroupContextActionTypes,
  GroupContextState,
  GroupContextType,
} from 'models/group.context.types';
import { getGroup } from 'network/group.network';

const initialState = {
  group: null,
};

const reducer = (state: GroupContextState, action: GroupContextActions) => {
  switch (action.type) {
    case GroupContextActionTypes.SET_GROUP:
      Cookies.set('groupId', action.payload.group._id);
      return {
        ...state,
        group: action.payload.group,
      };
    case GroupContextActionTypes.REMOVE_GROUP:
      Cookies.remove('groupId');
      return {
        ...state,
        group: null,
      };
    default:
      return state;
  }
};

export const GroupContext = createContext<GroupContextType>({ state: initialState, dispatch: () => null });

export const GroupProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const groupId = Cookies.get('groupId');

  useEffect(() => {
    if (groupId) {
      getGroup({ groupId })
        .then((res) => {
          dispatch({ type: GroupContextActionTypes.SET_GROUP, payload: { group: res } });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: GroupContextActionTypes.REMOVE_GROUP });
        });
    }
  }, []);

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
