import React, { createContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import useUser from 'hooks/user.hook';
import { UserContextActionTypes } from 'models/user.context.types';
const initialState = {
  isAuthenticated: false,
  user: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case UserContextActionTypes.LOGIN:
      Cookies.set('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
      };
    case UserContextActionTypes.LOGOUT:
      Cookies.remove('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UserContextActionTypes.USER:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    default:
      return state;
  }
};
const UserContext = createContext({ state: initialState, dispatch: () => null });
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateUser } = useUser({ dispatch });
  const { isAuthenticated } = state;
  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      dispatch({ type: UserContextActionTypes.LOGIN, payload: { token } });
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      updateUser();
    }
  }, [isAuthenticated]);
  return React.createElement(
    UserContext.Provider,
    {
      value: {
        state,
        dispatch,
      },
    },
    children
  );
};
export { UserContext, UserProvider };
