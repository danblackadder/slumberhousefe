import React, { createContext, useReducer } from 'react';
import { GroupContextActionTypes } from 'models/group.context.types';
const initialState = {
  group: null,
};
const reducer = (state, action) => {
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
const GroupContext = createContext({ state: initialState, dispatch: () => null });
const GroupProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(
    GroupContext.Provider,
    {
      value: {
        state,
        dispatch,
      },
    },
    children
  );
};
export { GroupContext, GroupProvider };
